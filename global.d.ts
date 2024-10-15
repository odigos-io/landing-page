interface Window {
  hbspt: {
    forms: {
      create: (options: {
        region: string;
        portalId: string;
        formId: string;
        target: string;
      }) => void;
    };
  };
}
