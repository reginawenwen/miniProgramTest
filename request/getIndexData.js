import reqeust from './request'
export function getTaskStataus() {
  return reqeust({
    url: 'public/api/seaweed/v1/order/statuTypes',
  })
}
export function getTaskList(params) {
  return reqeust({
    url: 'public/api/seaweed/v1/order/list',
    method: 'post',
    data: params
  })
}
export function handleTask(params) {
  return reqeust({
    url: 'public/api/seaweed/v1/order/handle',
    method: 'post',
    data:params
  })
}
export function taskdetail(params) {
  return reqeust({
    url: 'public/api/seaweed/v1/order/detail?id='+params.id,
  })
}
export function configList() {
  return reqeust({
    url: '/public/api/seaweed/v1/config/list'
  })
}