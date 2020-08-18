import {
  GET_SUBJECT_LIST,
  GET_SEC_SUBJECT_LIST,
  DEL_SUBJECT_LIST
} from "./constants";

const initSubjectList = {
  total: 0, // 总数
  items: [], // 详细课程数据

};

export default function subjectList(prevState = initSubjectList, action) {
  switch (action.type) {
    case GET_SUBJECT_LIST:
      action.data.items.forEach(item => {
        item.children = []
      });
      return action.data;
    case GET_SEC_SUBJECT_LIST:
      const SecItems = action.data.items
      const FisItems = prevState.items

      SecItems.length && FisItems.forEach(item => {
        if (item._id === SecItems[0].parentId) {
          item.children = SecItems
        }
      })
      return {
        ...prevState,
        items: FisItems
      }
    case DEL_SUBJECT_LIST:
      return {
        total: prevState.total - 1,
        items: prevState.items.filter((item) => item._id !== action.data),
      };
    default:
      return prevState;
  }
}
// const delid = {
//   id:''
// }
// export  function delsubjectList(prevState = delid, action) {
//   switch (action.type) {
//     case DEL_SUBJECT_LIST:
//       return action.data;
//     default:
//       return prevState;
//   }
// }
