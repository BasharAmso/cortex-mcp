---
id: EX-0027
name: Online Course Module
category: examples
tags: [education, course, module, lesson, progress, lms, typescript]
capabilities: [course-structure, lesson-management, progress-tracking]
useWhen:
  - building an online course platform with modules and lessons
  - implementing student progress tracking across course content
  - designing a course content structure with completion logic
estimatedTokens: 600
relatedFragments: [SKL-0274, SKL-0147, PAT-0150, PAT-0143, SKL-0276]
dependencies: []
synonyms: ["online course example", "lms implementation", "course platform", "lesson progress tracking", "education module system"]
sourceUrl: "https://github.com/freeCodeCamp/freeCodeCamp"
lastUpdated: "2026-04-01"
difficulty: intermediate
owner: builder
pillar: "education"
---

# Online Course Module

A course module system with lessons, progress tracking, and content dripping.

## Implementation

```typescript
// --- Course Structure ---
interface Course {
  id: string;
  title: string;
  description: string;
  modules: Module[];
  enrollmentCount: number;
  published: boolean;
}

interface Module {
  id: string;
  title: string;
  order: number;
  lessons: Lesson[];
  unlockAfterModuleId?: string; // content dripping: previous module must be complete
}

interface Lesson {
  id: string;
  title: string;
  type: 'video' | 'text' | 'quiz' | 'exercise';
  content: string;          // markdown or video URL
  durationMinutes: number;
  order: number;
}

// --- Progress Tracking ---
interface StudentProgress {
  studentId: string;
  courseId: string;
  completedLessons: Set<string>;  // lesson IDs
  quizScores: Map<string, number>; // lessonId -> score (0-100)
  lastAccessedAt: Date;
  enrolledAt: Date;
}

function getCourseProgress(course: Course, progress: StudentProgress) {
  const totalLessons = course.modules.reduce((sum, m) => sum + m.lessons.length, 0);
  const completedCount = progress.completedLessons.size;

  const moduleProgress = course.modules.map(mod => {
    const moduleLessons = mod.lessons.length;
    const moduleCompleted = mod.lessons.filter(l => progress.completedLessons.has(l.id)).length;

    return {
      moduleId: mod.id,
      title: mod.title,
      completed: moduleCompleted,
      total: moduleLessons,
      percentage: moduleLessons > 0 ? Math.round((moduleCompleted / moduleLessons) * 100) : 0,
      isUnlocked: isModuleUnlocked(mod, course, progress),
    };
  });

  return {
    overallPercentage: totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0,
    completedLessons: completedCount,
    totalLessons,
    modules: moduleProgress,
    isComplete: completedCount === totalLessons,
  };
}

function isModuleUnlocked(module: Module, course: Course, progress: StudentProgress): boolean {
  if (!module.unlockAfterModuleId) return true; // first module is always unlocked

  const prereq = course.modules.find(m => m.id === module.unlockAfterModuleId);
  if (!prereq) return true;

  // All lessons in prerequisite module must be completed
  return prereq.lessons.every(l => progress.completedLessons.has(l.id));
}

// --- Lesson Completion ---
async function completeLesson(
  studentId: string,
  courseId: string,
  lessonId: string,
  quizScore?: number,
): Promise<{ progress: ReturnType<typeof getCourseProgress>; newUnlocks: string[] }> {
  const progress = await getOrCreateProgress(studentId, courseId);
  progress.completedLessons.add(lessonId);
  progress.lastAccessedAt = new Date();

  if (quizScore !== undefined) {
    progress.quizScores.set(lessonId, quizScore);
  }

  await saveProgress(progress);

  const course = await getCourse(courseId);
  const updatedProgress = getCourseProgress(course, progress);

  // Check for newly unlocked modules
  const newUnlocks = updatedProgress.modules
    .filter(m => m.isUnlocked && m.completed === 0 && m.moduleId !== course.modules[0].id)
    .map(m => m.title);

  // Send completion certificate if course is done
  if (updatedProgress.isComplete) {
    issueCertificate(studentId, courseId).catch(console.error);
  }

  return { progress: updatedProgress, newUnlocks };
}
```

## Key Patterns

- **Content dripping**: modules unlock sequentially via `unlockAfterModuleId`
- **Progress as a Set**: O(1) lookup for "is this lesson complete?"
- **Module-level and course-level progress**: students see both granular and overall completion
- **Unlock notifications**: `newUnlocks` tells the UI to celebrate when a new module opens
