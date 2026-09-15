import { addons } from 'storybook/manager-api';
import { create } from 'storybook/theming';

addons.setConfig({
  theme: create({
    base: 'light',
    brandTitle: 'Lagrange',
    brandImage: './brand/icon.svg',
    brandUrl: 'https://github.com/fleetia/lagrange',
    brandTarget: '_blank',
  }),
});
