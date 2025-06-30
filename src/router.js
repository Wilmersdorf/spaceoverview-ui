import { createRouter, createWebHashHistory } from 'vue-router'
import AddDifferentialEquation from '@/views/differentialEquation/AddDifferentialEquation.vue'
import AddDifferentialEquationLink from '@/views/differentialEquation/AddDifferentialEquationLink.vue'
import AddDifferentialEquationProperty from '@/views/differentialEquation/AddDifferentialEquationProperty.vue'
import AddLink from '@/views/space/AddLink.vue'
import AddProperty from '@/views/space/AddProperty.vue'
import AddSpace from '@/views/space/AddSpace.vue'
import AddTheorem from '@/views/space/AddTheorem.vue'
import Admin from '@/views/Admin.vue'
import DeleteDifferentialEquation from '@/views/differentialEquation/DeleteDifferentialEquation.vue'
import DeleteDifferentialEquationLink from '@/views/differentialEquation/DeleteDifferentialEquationLink.vue'
import DeleteDifferentialEquationProperty from '@/views/differentialEquation/DeleteDifferentialEquationProperty.vue'
import DeleteLink from '@/views/space/DeleteLink.vue'
import DeleteProperty from '@/views/space/DeleteProperty.vue'
import DeleteSpace from '@/views/space/DeleteSpace.vue'
import DeleteTheorem from '@/views/space/DeleteTheorem.vue'
import DifferentialEquation from '@/views/differentialEquation/DifferentialEquation.vue'
import DifferentialEquationLink from '@/views/differentialEquation/DifferentialEquationLink.vue'
import DifferentialEquationProperties from '@/views/differentialEquation/DifferentialEquationProperties.vue'
import DifferentialEquationProperty from '@/views/differentialEquation/DifferentialEquationProperty.vue'
import DifferentialEquationPropertyLink from '@/views/differentialEquation/DifferentialEquationPropertyLink.vue'
import DifferentialEquations from '@/views/differentialEquation/DifferentialEquations.vue'
import EditDifferentialEquation from '@/views/differentialEquation/EditDifferentialEquation.vue'
import EditDifferentialEquationLink from '@/views/differentialEquation/EditDifferentialEquationLink.vue'
import EditDifferentialEquationProperty from '@/views/differentialEquation/EditDifferentialEquationProperty.vue'
import EditLink from '@/views/space/EditLink.vue'
import EditProperty from '@/views/space/EditProperty.vue'
import EditSpace from '@/views/space/EditSpace.vue'
import EditTheorem from '@/views/space/EditTheorem.vue'
import Home from '@/views/Home.vue'
import Info from '@/views/Info.vue'
import jsCookie from 'js-cookie'
import NotFound from '@/views/NotFound.vue'
import Properties from '@/views/space/Properties.vue'
import Property from '@/views/space/Property.vue'
import PropertySpaceLink from '@/views/space/PropertySpaceLink.vue'
import SelectDifferentialEquationLink from '@/views/differentialEquation/SelectDifferentialEquationLink.vue'
import SelectLink from '@/views/space/SelectLink.vue'
import Space from '@/views/space/Space.vue'
import SpacePropertyLink from '@/views/space/SpacePropertyLink.vue'
import Spaces from '@/views/space/Spaces.vue'
import Theorem from '@/views/space/Theorem.vue'
import Theorems from '@/views/space/Theorems.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/admin', component: Admin },
  { path: '/differential-equation', component: DifferentialEquations },
  {
    path: '/differential-equation/:differentialEquationId/property/:propertyId',
    component: DifferentialEquationLink
  },
  {
    path: '/differential-equation/:differentialEquationId/property/:propertyId/add',
    component: AddDifferentialEquationLink
  },
  {
    path: '/differential-equation/:differentialEquationId/property/:propertyId/delete',
    component: DeleteDifferentialEquationLink
  },
  {
    path: '/differential-equation/:differentialEquationId/property/:propertyId/edit',
    component: EditDifferentialEquationLink
  },
  { path: '/differential-equation/:id', component: DifferentialEquation },
  { path: '/differential-equation/:id/delete', component: DeleteDifferentialEquation },
  { path: '/differential-equation/:id/edit', component: EditDifferentialEquation },
  { path: '/differential-equation/:id/property/add', component: SelectDifferentialEquationLink },
  { path: '/differential-equation/add', component: AddDifferentialEquation },
  { path: '/differential-equation/property', component: DifferentialEquationProperties },
  { path: '/differential-equation/property/:id', component: DifferentialEquationProperty },
  {
    path: '/differential-equation/property/:id/delete',
    component: DeleteDifferentialEquationProperty
  },
  { path: '/differential-equation/property/:id/edit', component: EditDifferentialEquationProperty },
  {
    path: '/differential-equation/property/:propertyId/differential-equation/:differentialEquationId',
    component: DifferentialEquationPropertyLink
  },
  { path: '/differential-equation/property/add', component: AddDifferentialEquationProperty },
  { path: '/info', component: Info },
  { path: '/not-found', component: NotFound },
  { path: '/property', component: Properties },
  { path: '/property/:id', component: Property },
  { path: '/property/:id/delete', component: DeleteProperty },
  { path: '/property/:id/edit', component: EditProperty },
  { path: '/property/:propertyId/space/:spaceId', component: PropertySpaceLink },
  { path: '/property/add', component: AddProperty },
  { path: '/space', component: Spaces },
  { path: '/space/:id', component: Space },
  { path: '/space/:id/delete', component: DeleteSpace },
  { path: '/space/:id/edit', component: EditSpace },
  { path: '/space/:id/property/add', component: SelectLink },
  { path: '/space/:spaceId/property/:propertyId', component: SpacePropertyLink },
  { path: '/space/:spaceId/property/:propertyId/add', component: AddLink },
  { path: '/space/:spaceId/property/:propertyId/delete', component: DeleteLink },
  { path: '/space/:spaceId/property/:propertyId/edit', component: EditLink },
  { path: '/space/add', component: AddSpace },
  { path: '/theorem', component: Theorems },
  { path: '/theorem/:id', component: Theorem },
  { path: '/theorem/:id/delete', component: DeleteTheorem },
  { path: '/theorem/:id/edit', component: EditTheorem },
  { path: '/theorem/add', component: AddTheorem },
  // https://router.vuejs.org/guide/essentials/dynamic-matching#Catch-all-404-Not-found-Route
  { path: '/:pathMatch(.*)*', component: NotFound, name: 'NotFound' }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  for (const node of document.querySelectorAll('.show')) {
    if (node.classList.contains('modal')) {
      Modal.getInstance(node).hide()
      next(false)
      return
    }
  }
  const isAdmin = jsCookie.get('isAdmin') === 'true'
  const canEdit = jsCookie.get('canEdit') === 'true'
  const { path } = to
  if (path === '/admin' && !isAdmin) {
    next('/not-found')
  } else if (
    path !== undefined &&
    (path.endsWith('add') ||
      path.endsWith('edit') ||
      path.endsWith('delete') ||
      path === '/info') &&
    !canEdit
  ) {
    next('/not-found')
  } else {
    next()
  }
})

export default router
