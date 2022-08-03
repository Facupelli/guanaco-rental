import { configureStore } from '@reduxjs/toolkit'
import equipmentReducer from '../redux/features/equipment/equipmentSlice'
// import postsReducer from '../features/posts/postsSlice'
// import commentsReducer from '../features/comments/commentsSlice'

export default configureStore({
  reducer: {
    equipment: equipmentReducer,
    // posts: postsReducer,
    // comments: commentsReducer
  }
})