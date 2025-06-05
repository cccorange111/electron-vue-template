import { RouteRecordRaw } from 'vue-router'
import notFound from '@renderer/views/404.vue'
import search from "@renderer/views/search/Search.vue"
import searchByRnx from "@renderer/views/search/searchByRnx.vue"
import searchHome from "@renderer/views/searchHome/SearchHome.vue"
import searchLiterature from "@renderer/views/search/searchLiterature.vue"
import index from "@renderer/views/Index.vue"
import landingpage from "@renderer/views/landing-page/landing-page.vue"
const routes: Array<RouteRecordRaw> = [
  {
    path: '/search',
    name: 'search',
    component: search,
    props: (route) => ({ query: route.query.q,id:route.query.id }), 
  },
  {
    path: '/searchbyrnx',
    name: 'searchbyrnx',
    component: searchByRnx,
    props: (route) => ({ query: route.query.q,id:route.query.id }), 
  },
  {
    path: '/searchLiterature',
    name: 'searchLiterature',
    component: searchLiterature,
    props: (route) => ({id:route.query.id }),
  },
  { path: '/home', name: 'home', component:  searchHome},
  { path: '/:pathMatch(.*)*', component: notFound },
  { path: '/', name: '总览', component:  index},

]

export default routes
