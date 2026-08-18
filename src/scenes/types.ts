import type { AchievementId } from '../config/story.config'

export type SceneProps = {
  onDone: () => void
  unlock: (id: AchievementId) => void
}
