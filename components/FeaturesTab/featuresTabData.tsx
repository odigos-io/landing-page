import { FeatureTab } from '@/types/featureTab';

const featuresTabData: FeatureTab[] = [
  {
    id: 'tabOne',
    title: 'Install Odigos.',
    desc1: `Install Odigos on your Kubernetes cluster by executing a single command.`,
    desc2: `    Nam id eleifend dui, id iaculis purus. Etiam lobortis neque nec finibus sagittis. Nulla ligula nunc egestas ut.`,
    image: '/odigos-installation.png',
    imageDark: '/images/features/features-dark-01.svg',
  },
  {
    id: 'tabTwo',
    title: 'Select Applications.',
    desc1: `Select target applications: choose specific applications, or let Odigos instrument everything automatically.`,
    desc2: `    Nam id eleifend dui, id iaculis purus. Etiam lobortis neque nec finibus sagittis. Nulla ligula nunc egestas ut.`,
    image: '/select-apps.png',
    imageDark: '/images/features/features-dark-01.svg',
  },
  {
    id: 'tabThree',
    title: 'Choose Vendors',
    desc1: `Choose where to send the observability data. Both managed vendors and open source solutions are supported.`,
    desc2: `Nam id eleifend dui, id iaculis purus. Etiam lobortis neque nec finibus sagittis. Nulla ligula nunc egestas ut.`,
    image: '/select-dest.png',
    imageDark: '/images/features/features-dark-01.svg',
  },
];

export default featuresTabData;
