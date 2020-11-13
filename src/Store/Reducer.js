
const reducer = (state, action) => {
  let newState = state;
  switch (action.type) {
    case "GETDATAFROMFIREBASE":
      newState = {
        ...newState,
        isDataLoading: !state.isDataLoading,
        data: action.payload,
      }
      return newState
    case "GETIMAGESFROMFIREBASE":
      newState = {
        ...newState,
        images: action.payload
      }
      return newState
    case "GETALLUSERS":
      newState = {
        ...newState,
        users: action.payload,
      }
      return newState
    case 'GETADDETAILVIEW':
      let filterData = Object.values(state.data).filter(find => find.AddId === action.payload)
      let filterImage = state.images.filter(find => find.folderName === action.payload)
      newState = {
        ...newState,
        detailAddViewData: filterData,
        detailAddImageData: filterImage
      }
      return newState;
    case 'LOGIN':
      return state = {
        ...state,
        user: action.payload,
        isLogin: !state.isLogin
      }
    default:
      return state;
  }
};
export default reducer;