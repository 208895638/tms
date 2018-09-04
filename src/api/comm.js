import axios from 'axios'
import url from '@/js/common.js'

const getAllOrgs = () => {
  return axios.get(url.apiUrl() + '/api/Org/GetAllOrgs')
}

const getAllRoles = () => {
  return axios.get(url.apiUrl() + '/api/Role/GetAllRoles')
}

const getEnableModulesByRoleId = roleId => {
  return axios.get(
    url.apiUrl() + `/api/module/GetEnableModulesByRoleId?roleId=${roleId}`
  )
}

const getTreeModules = () => {
  return axios.get(url.apiUrl() + '/api/Module/GetTreeModules')
}

const getFunctionsByModuleId = moduleId => {
  return axios.get(
    url.apiUrl() + `/api/function/GetFunctionsByModuleId?moduleId=${moduleId}`
  )
}

const getFunctionsByRoleIdAndModuleId = (roleId, moduleId) => {
  return axios.get(
    url.apiUrl() +
      `/api/role/GetFunctionsByRoleIdAndModuleId?roleId=${roleId}&moduleId=${moduleId}`
  )
}

const batchRoleUpFunction = functionViews => {
  return axios.post(
    url.apiUrl() + '/api/role/BatchRoleUpFunction',
    functionViews
  )
}

const upModuleDisabledByModuleId = moduleView => {
  return axios.post(
    url.apiUrl() + '/api/module/UpModuleDisabledByModuleId',
    moduleView
  )
}

const deleteModuleByModuleId = moduleView => {
  return axios.post(
    url.apiUrl() + '/api/module/DeleteModuleByModuleId',
    moduleView
  )
}

const getApisByFunId = functionId => {
  return axios.get(
    url.apiUrl() + `/api/apis/GetApisByFunId?functionId=${functionId}`
  )
}

const functionDelete = functionInfo => {
  return axios.post(url.apiUrl() + `/api/function/delete`, functionInfo)
}

const apiDelete = apiInfo => {
  return axios.post(url.apiUrl() + `/api/apis/delete`, apiInfo)
}

export {
  getAllOrgs,
  getAllRoles,
  getEnableModulesByRoleId,
  getTreeModules,
  getFunctionsByModuleId,
  getFunctionsByRoleIdAndModuleId,
  batchRoleUpFunction,
  upModuleDisabledByModuleId,
  deleteModuleByModuleId,
  getApisByFunId,
  functionDelete,
  apiDelete
}
