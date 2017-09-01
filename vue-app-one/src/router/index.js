import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Admin from '@/components/Admin/Admin'
import Profile from '@/components/User/Profile'
import Signin from '@/components/User/Signin'
import Exams from '@/components/Admin/Exams/Exams'
import Exam from '@/components/Admin/Exams/Exam'
import CreateExam from '@/components/Admin/Exams/CreateExam'
import Users from '@/components/Admin/Users/Users'
import User from '@/components/Admin/Users/User'
import CreateUser from '@/components/Admin/Users/CreateUser'
import AuthGuard from './auth-guard'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      beforeEnter: AuthGuard
    },
    {
      path: '/admin',
      name: 'Admin',
      component: Admin,
      beforeEnter: AuthGuard
    },
    {
      path: '/signin',
      name: 'Signin',
      component: Signin
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile,
      beforeEnter: AuthGuard
    },
    {
      path: '/admin/exams',
      name: 'Exams',
      component: Exams,
      beforeEnter: AuthGuard
    },
    {
      path: '/admin/exams/:id',
      name: 'Exam',
      props: true,
      component: Exam,
      beforeEnter: AuthGuard
    },
    {
      path: '/admin/exam/new',
      name: 'CreateExam',
      component: CreateExam,
      beforeEnter: AuthGuard
    },
    {
      path: '/admin/users',
      name: 'Users',
      component: Users,
      beforeEnter: AuthGuard
    },
    {
      path: '/admin/users/:id',
      name: 'User',
      props: true,
      component: User,
      beforeEnter: AuthGuard
    },
    {
      path: '/admin/user/new',
      name: 'CreateUser',
      component: CreateUser,
      beforeEnter: AuthGuard
    }
  ],
  mode: 'history'
})
