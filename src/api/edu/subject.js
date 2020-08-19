import request from "@utils/request";

const BASE_URL = "/admin/edu/subject";

//mock开始
const MOCK_URL = 'http://localhost:8888/admin/edu/subject'
// 获取一级
export function reqGetSubject(page,limit) {
  return request({
    //注意，会自动proxy自动拼接发送请求
    //假设没有借口，此时使用mock服务
    url: `${BASE_URL}/${page}/${limit}`,
    method: "GET",
  });
}
export function reqGetSecSubject(parentId) {
  return request({
    //注意，会自动proxy自动拼接发送请求
    //假设没有借口，此时使用mock服务
    url: `${BASE_URL}/get/${parentId}`,
    method: "GET",
  });
}

export function reqAddSecSubject(title,parentId) {
  return request({
    //注意，会自动proxy自动拼接发送请求
    //假设没有借口，此时使用mock服务
    url: `${BASE_URL}/save`,
    method: "POST",
    data:{
      title,
      parentId
    }
  });
}
export function reqUpdateSubject(id,title) {
  return request({
    //注意，会自动proxy自动拼接发送请求
    //假设没有借口，此时使用mock服务
    url: `${BASE_URL}/update`,
    method: "PUT",
    data:{
      id,
      title
    }
  });
}


export function reqDelSubject(id) {
  return request({
    //注意，会自动proxy自动拼接发送请求
    //假设没有借口，此时使用mock服务
    url: `${BASE_URL}/remove/${id}`,
    method: "DELETE",
  });
}
// http://localhost:5000/admin/edu/subject/remove/:id