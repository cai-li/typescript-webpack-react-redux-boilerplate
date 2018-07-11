import { handleActions } from "redux-actions";
import {
  getSubredditPostsStartAction, getSubredditPostsSuccessAction, getSubredditPostsErrorAction,
  GetSubredditPostsStartActionPayload, GetSubredditPostsSuccessActionPayload,
  GetSubredditPostsErrorActionPayload,
} from "./../Actions/GetSubredditPostsActions";
import { SubredditsState } from "./../Store/State/SubredditsState";

const initialState: SubredditsState = {
  items: {},
  selectedSubreddit: undefined,
};

export default handleActions<SubredditsState, GetSubredditPostsErrorActionPayload & GetSubredditPostsSuccessActionPayload>({
  [getSubredditPostsStartAction.toString()]: (state, action) => {
    return {
      selectedSubreddit: action.payload.subreddit,
      items: {
        ...state.items,
        [action.payload.subreddit]: {
          name: action.payload.subreddit,
          isLoading: true,
          isError: false,
          posts: [],
        },
      },
    };
  },
  [getSubredditPostsSuccessAction.toString()]: (state, action) => {
    const updatedItem = {
      ...state.items[action.payload.subreddit],
      isLoading: false,
      posts: action.payload.posts,
    };

    return {
      ...state,
      items: {
        ...state.items,
        [action.payload.subreddit]: updatedItem,
      },
    };
  },

  [getSubredditPostsErrorAction.toString()]: (state, action) => {
    const errorItem = {
      ...state.items[action.payload.subreddit],
      isLoading: false,
      isError: true,
      posts: [],
    };

    return {
      ...state,
      items: {
        ...state.items,
        [action.payload.subreddit]: errorItem,
      },
    };
  },
}, initialState);