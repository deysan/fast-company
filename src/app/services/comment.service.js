import httpService from './http.service';
const commentEndpoint = 'comment/';

const commentService = {
  createComment: async (payload) => {
    const { data } = await httpService.put(
      commentEndpoint + payload._id,
      payload
    );
    return data;
  }
};
export default commentService;
