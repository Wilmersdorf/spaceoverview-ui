import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Info from './views/Info.vue';
import Admin from './views/Admin.vue';
import Spaces from './views/Spaces.vue';
import Space from './views/Space.vue';
import AddSpace from './views/AddSpace.vue';
import EditSpace from './views/EditSpace.vue';
import DeleteSpace from './views/DeleteSpace.vue';
import Properties from './views/Properties.vue';
import Property from './views/Property.vue';
import AddProperty from './views/AddProperty.vue';
import EditProperty from './views/EditProperty.vue';
import DeleteProperty from './views/DeleteProperty.vue';
import SelectLink from './views/SelectLink.vue';
import AddLink from './views/AddLink.vue';
import SpacePropertyLink from './views/SpacePropertyLink.vue';
import PropertySpaceLink from './views/PropertySpaceLink.vue';
import EditLink from './views/EditLink.vue';
import DeleteLink from './views/DeleteLink.vue';
import NotFound from './views/NotFound.vue';
import jsCookie from 'js-cookie';
import Theorems from './views/Theorems.vue';
import AddTheorem from './views/AddTheorem.vue';
import Theorem from './views/Theorem.vue';
import EditTheorem from './views/EditTheorem.vue';
import DeleteTheorem from './views/DeleteTheorem.vue';

Vue.use(Router);

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
      path: '/not-found',
      component: NotFound,
      name: '404'
    },
    { path: '*', redirect: '/not-found' }
  ]
});

router.beforeEach((to, from, next) => {
  let isAdmin = router.app.isAdmin || jsCookie.get('isAdmin') === 'true';
  let canEdit = router.app.canEdit || jsCookie.get('canEdit') === 'true';
  let name = to.name;
  if (to.path === '/admin') {
    if (!isAdmin) {
      next({ name: '404' });
    } else {
      next();
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
    next({ name: '404' });
  } else {
    next();
  }
});

export default router;
