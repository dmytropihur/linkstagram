import { RootState } from '../index';

const selectPosts = (state: RootState) => state.posts;

export default selectPosts;
