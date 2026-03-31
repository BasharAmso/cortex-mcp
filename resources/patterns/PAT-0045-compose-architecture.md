---
id: PAT-0045
name: Compose Architecture
category: patterns
tags: [jetpack-compose, android, architecture, udf, viewmodel, repository, room, hilt, kotlin]
capabilities: [android-architecture, unidirectional-data-flow, viewmodel-patterns, repository-layer, hilt-di]
useWhen:
  - structuring an Android app with Jetpack Compose
  - implementing unidirectional data flow with ViewModel
  - setting up Room database with repository pattern
  - configuring Hilt dependency injection
  - choosing between MVI and MVVM for Android
estimatedTokens: 700
relatedFragments: [SKL-0109, SKL-0007, PAT-0006]
dependencies: []
synonyms: ["Android app architecture", "Compose MVVM setup", "unidirectional data flow Android", "how to structure a Compose project", "Hilt dependency injection", "Room database with Compose"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/android/compose-samples"
difficulty: advanced
owner: builder
pillar: "platform"
---

# Compose Architecture

Structure Android Compose apps following the official architecture guidelines: UI layer, domain layer (optional), and data layer with unidirectional data flow.

## Unidirectional Data Flow (UDF)

State flows down from ViewModel to UI. Events flow up from UI to ViewModel. The UI never modifies state directly.

```
UI (Composable)
  ↑ state (StateFlow)
  ↓ events (function calls)
ViewModel
  ↓ calls
Repository
  ↓ reads/writes
DataSource (Room / Network)
```

## ViewModel Pattern

Expose UI state as a single `StateFlow<UiState>`. Use sealed classes/interfaces for state variants.

```kotlin
data class UserListUiState(
    val users: List<User> = emptyList(),
    val isLoading: Boolean = false,
    val error: String? = null,
)

@HiltViewModel
class UserListViewModel @Inject constructor(
    private val userRepository: UserRepository,
) : ViewModel() {

    val uiState: StateFlow<UserListUiState> = userRepository
        .observeUsers()
        .map { users -> UserListUiState(users = users) }
        .stateIn(viewModelScope, SharingStarted.WhileSubscribed(5000), UserListUiState(isLoading = true))

    fun deleteUser(id: String) {
        viewModelScope.launch { userRepository.delete(id) }
    }
}
```

Collect in Compose with `val uiState by viewModel.uiState.collectAsStateWithLifecycle()`.

## Repository Pattern

Repositories mediate between data sources. They decide whether to serve from cache, database, or network.

```kotlin
class UserRepository @Inject constructor(
    private val userDao: UserDao,
    private val userApi: UserApi,
) {
    fun observeUsers(): Flow<List<User>> = userDao.observeAll()

    suspend fun refresh() {
        val remote = userApi.fetchUsers()
        userDao.upsertAll(remote.map { it.toEntity() })
    }
}
```

The offline-first pattern: Room is the single source of truth. Network calls update Room; UI observes Room via Flow.

## Room Database

Define entities, DAOs, and the database class. Use Flow return types for reactive queries.

```kotlin
@Entity
data class UserEntity(
    @PrimaryKey val id: String,
    val name: String,
    val email: String,
)

@Dao
interface UserDao {
    @Query("SELECT * FROM UserEntity")
    fun observeAll(): Flow<List<UserEntity>>

    @Upsert
    suspend fun upsertAll(users: List<UserEntity>)
}
```

## Hilt Dependency Injection

Annotate the Application class with `@HiltAndroidApp`. Use `@HiltViewModel` for ViewModels, `@Inject constructor` for repositories, and `@Module` + `@Provides` for third-party dependencies.

```kotlin
@Module
@InstallIn(SingletonComponent::class)
object DataModule {
    @Provides @Singleton
    fun provideDatabase(@ApplicationContext ctx: Context): AppDatabase =
        Room.databaseBuilder(ctx, AppDatabase::class.java, "app.db").build()

    @Provides
    fun provideUserDao(db: AppDatabase): UserDao = db.userDao()
}
```

## Project Structure

```
app/src/main/
  di/                # Hilt modules
  data/
    local/           # Room entities, DAOs, database
    remote/          # Retrofit services, DTOs
    repository/      # Repository implementations
  domain/
    model/           # Domain models
    usecase/         # Use cases (optional layer)
  ui/
    theme/           # Material 3 theme
    navigation/      # NavHost, routes
    features/
      userlist/      # Screen + ViewModel
      userdetail/    # Screen + ViewModel
```

## Testing

- **ViewModel tests:** Use `Turbine` to test StateFlow emissions. Inject fake repositories.
- **Repository tests:** Use in-memory Room database + mock API (MockWebServer).
- **UI tests:** Use Compose testing APIs (`composeTestRule.setContent`, `onNodeWithText`, `performClick`).
