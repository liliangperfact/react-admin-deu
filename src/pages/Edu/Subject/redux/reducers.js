import {
  GET_SUBJECT_LIST,
  GET_SEC_SUBJECT_LIST,
  UPDATE_SUBJECT,
  DELETE_SUBJECT
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
    case UPDATE_SUBJECT:
      console.log(action.data)
      prevState.items.forEach(item => {
        if (item._id === action.data.id) {
          item.title = action.data.title
          return
        }

        // 遍历二级
        item.children.forEach(secItem => {
          if (secItem._id === action.data.id) {
            secItem.title = action.data.title
            return
          }
        })
        return {
          ...prevState
        }
      })
    case DELETE_SUBJECT:
      const firstItems = [...prevState.items]
      firstItems.forEach((item,index )=> {
        if (item._id === action.data) {
          firstItems.splice(index,1)
          return
        }

        // 遍历二级
        item.children.forEach((secItem,index) => {
          if (secItem._id === action.data) {
            item.children.splice(index,1)
            return
          }
        })
      })
      return {
        ...prevState,
        items:firstItems
      }
    default:
      return prevState;
  }
}

