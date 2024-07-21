import stepOne from '../../public/lotties/step-one.json';
import stepTwo from '../../public/lotties/step-two.json';
import stepThree from '../../public/lotties/step-three.json';

export const DATA = [
  {
    title: 'Install Odigos',
    subtitle:
      'Install Odigos on your Kubernetes cluster by executing a single command.',
    image: '/images/how-to-start/step-1.svg',
    lottie: stepOne,
  },
  {
    title: 'Select Applications',
    subtitle:
      'Select target applications: choose specific applications, or let Odigos instrument everything automatically.',
    image: '/images/how-to-start/step-2.svg',
    lottie: stepTwo,
  },
  {
    title: 'Choose Destinations',
    subtitle:
      'Choose where to send the observability data. Both managed vendors and open source solutions are supported.',
    image: '/images/how-to-start/step-3.svg',
    lottie: stepThree,
  },
];
