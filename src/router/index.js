import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import Quiz from '@/components/games/quiz/Main'
import OneToFifty from '@/components/games/1to50/Main'
import Bubble from '@/components/games/bubble/Main'
import Pingpong from '@/components/games/pingpong/Main'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/best'
    },
    {
      path: '/index.html',
      redirect: '/best'
    },
    {
      path: '/game/quiz',
      component: Quiz,
      props: true
    },
    {
      path: '/game/1to50',
      component: OneToFifty,
      props: true
    },
    {
      path: '/game/bubble',
      component: Bubble,
      props: true
    },
    {
      path: '/game/pingpong',
      component: Pingpong,
      props: true
    },
    {
      path: '/:category',
      component: Main,
      props: true
    }
  ]
})
