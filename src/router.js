import Vue from 'vue'
import Router from 'vue-router'
import jsCookie from 'js-cookie'
import Home from './views/Home.vue'
import Info from './views/Info.vue'
import Admin from './views/Admin.vue'
import Spaces from './views/space/Spaces.vue'
import Space from './views/space/Space.vue'
import AddSpace from './views/space/AddSpace.vue'
import EditSpace from './views/space/EditSpace.vue'
import DeleteSpace from './views/space/DeleteSpace.vue'
import Properties from './views/space/Properties.vue'
import Property from './views/space/Property.vue'
import AddProperty from './views/space/AddProperty.vue'
import EditProperty from './views/space/EditProperty.vue'
import DeleteProperty from './views/space/DeleteProperty.vue'
import SelectLink from './views/space/SelectLink.vue'
import AddLink from './views/space/AddLink.vue'
import SpacePropertyLink from './views/space/SpacePropertyLink.vue'
import PropertySpaceLink from './views/space/PropertySpaceLink.vue'
import EditLink from './views/space/EditLink.vue'
import DeleteLink from './views/space/DeleteLink.vue'
import NotFound from './views/NotFound.vue'
import Theorems from './views/space/Theorems.vue'
import AddTheorem from './views/space/AddTheorem.vue'
import Theorem from './views/space/Theorem.vue'
import EditTheorem from './views/space/EditTheorem.vue'
import DeleteTheorem from './views/space/DeleteTheorem.vue'
import DifferentialEquations from './views/differentialEquation/DifferentialEquations.vue'
import AddDifferentialEquation from './views/differentialEquation/AddDifferentialEquation.vue'
import EditDifferentialEquation from './views/differentialEquation/EditDifferentialEquation.vue'
import DeleteDifferentialEquation from './views/differentialEquation/DeleteDifferentialEquation.vue'
import DifferentialEquation from './views/differentialEquation/DifferentialEquation.vue'
import DifferentialEquationProperties from './views/differentialEquation/DifferentialEquationProperties.vue'
import AddDifferentialEquationProperty from './views/differentialEquation/AddDifferentialEquationProperty.vue'
import EditDifferentialEquationProperty from './views/differentialEquation/EditDifferentialEquationProperty.vue'
import DeleteDifferentialEquationProperty from './views/differentialEquation/DeleteDifferentialEquationProperty.vue'
import DifferentialEquationProperty from './views/differentialEquation/DifferentialEquationProperty.vue'
import SelectDifferentialEquationLink from './views/differentialEquation/SelectDifferentialEquationLink.vue'
import AddDifferentialEquationLink from './views/differentialEquation/AddDifferentialEquationLink.vue'
import DifferentialEquationLink from './views/differentialEquation/DifferentialEquationLink.vue'
import DifferentialEquationPropertyLink from './views/differentialEquation/DifferentialEquationPropertyLink.vue'
import EditDifferentialEquationLink from './views/differentialEquation/EditDifferentialEquationLink.vue'
import DeleteDifferentialEquationLink from './views/differentialEquation/DeleteDifferentialEquationLink.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/info',
      component: Info,
      name: 'info'
    },
    {
      path: '/admin',
      component: Admin
    },
    {
      path: '/space',
      component: Spaces
    },
    {
      path: '/space/add',
      component: AddSpace,
      name: 'add space'
    },
    { path: '/space/:id', name: 'space', component: Space },
    {
      path: '/space/:id/edit',
      component: EditSpace,
      name: 'edit space'
    },
    {
      path: '/space/:id/delete',
      component: DeleteSpace,
      name: 'delete space'
    },
    {
      path: '/space/:id/property/add',
      component: SelectLink,
      name: 'select link'
    },
    {
      path: '/space/:spaceId/property/:propertyId',
      component: SpacePropertyLink
    },
    {
      path: '/space/:spaceId/property/:propertyId/add',
      component: AddLink,
      name: 'add link'
    },
    {
      path: '/space/:spaceId/property/:propertyId/edit',
      component: EditLink,
      name: 'edit link'
    },
    {
      path: '/space/:spaceId/property/:propertyId/delete',
      component: DeleteLink,
      name: 'delete link'
    },
    {
      path: '/property',
      component: Properties
    },
    {
      path: '/property/add',
      component: AddProperty,
      name: 'add property'
    },
    {
      path: '/property/:id',
      component: Property
    },
    {
      path: '/property/:propertyId/space/:spaceId',
      component: PropertySpaceLink
    },
    {
      path: '/property/:id/edit',
      component: EditProperty,
      name: 'edit property'
    },
    {
      path: '/property/:id/delete',
      component: DeleteProperty,
      name: 'delete property'
    },
    {
      path: '/theorem',
      component: Theorems
    },
    {
      path: '/theorem/add',
      component: AddTheorem,
      name: 'add theorem'
    },
    {
      path: '/theorem/:id',
      component: Theorem
    },
    {
      path: '/theorem/:id/edit',
      component: EditTheorem,
      name: 'edit theorem'
    },
    {
      path: '/theorem/:id/delete',
      component: DeleteTheorem,
      name: 'delete theorem'
    },
    {
      path: '/differential-equation/property',
      component: DifferentialEquationProperties
    },
    {
      path: '/differential-equation/property/add',
      component: AddDifferentialEquationProperty,
      name: 'add differential equation property'
    },
    {
      path:
        '/differential-equation/property/:propertyId/differential-equation/:differentialEquationId',
      component: DifferentialEquationPropertyLink
    },
    {
      path: '/differential-equation/property/:id',
      component: DifferentialEquationProperty
    },
    {
      path: '/differential-equation/:id/property/add',
      component: SelectDifferentialEquationLink,
      name: 'select differential equation link'
    },
    {
      path: '/differential-equation/:differentialEquationId/property/:propertyId',
      component: DifferentialEquationLink
    },
    {
      path: '/differential-equation/:differentialEquationId/property/:propertyId/add',
      component: AddDifferentialEquationLink,
      name: 'add differential equation link'
    },
    {
      path: '/differential-equation/:differentialEquationId/property/:propertyId/edit',
      component: EditDifferentialEquationLink,
      name: 'edit differential equation link'
    },
    {
      path: '/differential-equation/:differentialEquationId/property/:propertyId/delete',
      component: DeleteDifferentialEquationLink,
      name: 'delete differential equation link'
    },
    {
      path: '/differential-equation/property/:id/edit',
      component: EditDifferentialEquationProperty,
      name: 'edit differential equation property'
    },
    {
      path: '/differential-equation/property/:id/delete',
      component: DeleteDifferentialEquationProperty,
      name: 'delete differential equation property'
    },
    {
      path: '/differential-equation',
      component: DifferentialEquations
    },
    {
      path: '/differential-equation/add',
      component: AddDifferentialEquation,
      name: 'add differential equation'
    },
    {
      path: '/differential-equation/:id',
      component: DifferentialEquation
    },
    {
      path: '/differential-equation/:id/edit',
      component: EditDifferentialEquation,
      name: 'edit differential equation'
    },
    {
      path: '/differential-equation/:id/delete',
      component: DeleteDifferentialEquation,
      name: 'delete differential equation'
    },
    {
      path: '/not-found',
      component: NotFound,
      name: '404'
    },
    { path: '*', redirect: '/not-found' }
  ]
})

router.beforeEach((to, from, next) => {
  const isAdmin = router.app.isAdmin || jsCookie.get('isAdmin') === 'true'
  const canEdit = router.app.canEdit || jsCookie.get('canEdit') === 'true'
  const { name } = to
  if (to.path === '/admin') {
    if (!isAdmin) {
      next({ name: '404' })
    } else {
      next()
    }
  } else if (
    name !== undefined &&
    (name.startsWith('add') ||
      name.startsWith('edit') ||
      name.startsWith('delete') ||
      name.startsWith('select') ||
      name === 'info') &&
    !canEdit
  ) {
    next({ name: '404' })
  } else {
    next()
  }
})

export default router
