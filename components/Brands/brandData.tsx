import { Brand } from '@/types/brand';

const brandData: any[] = [
  {
    type: 'managed',
    display_name: 'Chronosphere',
    image_url: '/dest/chronosphere.svg',
  },
  {
    type: 'managed',
    display_name: 'Datadog',
    image_url: '/dest/datadog.svg',
  },
  {
    type: 'managed',
    display_name: 'Dynatrace',
    image_url: '/dest/dynatrace.svg',
  },
  {
    type: 'managed',
    display_name: 'Google Cloud Monitoring',
    image_url: '/dest/gcp.svg',
  },
  // {
  //   type: 'managed',
  //   display_name: 'Grafana Cloud Loki',
  //   image_url: '/dest/grafana.svg',
  // },
  // {
  //   type: 'managed',
  //   display_name: 'Grafana Cloud Prometheus',
  //   image_url: '/dest/grafana.svg',
  // },
  {
    type: 'managed',
    display_name: 'Grafana Cloud Tempo',
    image_url: '/dest/grafana.svg',
  },
  {
    type: 'managed',
    display_name: 'Honeycomb',
    image_url: '/dest/honeycomb.svg',
  },
  {
    type: 'managed',
    display_name: 'Lightstep',
    image_url: '/dest/lightstep.svg',
  },
  {
    type: 'managed',
    display_name: 'Logz.io',
    image_url: '/dest/logzio.svg',
  },
  {
    type: 'managed',
    display_name: 'Middleware',
    image_url: '/dest/middleware.svg',
  },
  {
    type: 'managed',
    display_name: 'New Relic',
    image_url: '/dest/newrelic.svg',
  },
  {
    type: 'managed',
    display_name: 'OpsVerse',
    image_url: '/dest/opsverse.svg',
  },
  {
    type: 'managed',
    display_name: 'qryn',
    image_url: '/dest/qryn.svg',
  },
  {
    type: 'managed',
    display_name: 'AWS S3',
    image_url: '/dest/s3.svg',
  },
  {
    type: 'managed',
    display_name: 'Splunk',
    image_url: '/dest/splunk.svg',
  },
  {
    type: 'self hosted',
    display_name: 'Jaeger',
    image_url: '/dest/jaeger.svg',
  },
  {
    type: 'self hosted',
    display_name: 'Loki',
    image_url: '/dest/loki.svg',
  },
  {
    type: 'self hosted',
    display_name: 'Prometheus',
    image_url: '/dest/prometheus.svg',
  },
  {
    type: 'self hosted',
    display_name: 'SigNoz',
    image_url: '/dest/signoz.svg',
  },
  {
    type: 'self hosted',
    display_name: 'Tempo',
    image_url: '/dest/tempo.svg',
  },
  {
    type: 'managed',
    display_name: 'Azure Blob Storage',
    image_url: '/dest/blobstorage.svg',
  },
  {
    type: 'managed',
    display_name: 'Chronosphere',
    image_url: '/dest/chronosphere.svg',
  },
  {
    type: 'managed',
    display_name: 'Datadog',
    image_url: '/dest/datadog.svg',
  },
  {
    type: 'managed',
    display_name: 'Dynatrace',
    image_url: '/dest/dynatrace.svg',
  },
  {
    type: 'managed',
    display_name: 'Google Cloud Monitoring',
    image_url: '/dest/gcp.svg',
  },
  // {
  //   type: 'managed',
  //   display_name: 'Grafana Cloud Loki',
  //   image_url: '/dest/grafana.svg',
  // },
  // {
  //   type: 'managed',
  //   display_name: 'Grafana Cloud Prometheus',
  //   image_url: '/dest/grafana.svg',
  // },
  {
    type: 'managed',
    display_name: 'Grafana Cloud Tempo',
    image_url: '/dest/grafana.svg',
  },
  {
    type: 'managed',
    display_name: 'Honeycomb',
    image_url: '/dest/honeycomb.svg',
  },
  {
    type: 'managed',
    display_name: 'Lightstep',
    image_url: '/dest/lightstep.svg',
  },
  {
    type: 'managed',
    display_name: 'Logz.io',
    image_url: '/dest/logzio.svg',
  },
  {
    type: 'managed',
    display_name: 'Middleware',
    image_url: '/dest/middleware.svg',
  },
  {
    type: 'managed',
    display_name: 'New Relic',
    image_url: '/dest/newrelic.svg',
  },
  {
    type: 'managed',
    display_name: 'OpsVerse',
    image_url: '/dest/opsverse.svg',
  },
  {
    type: 'managed',
    display_name: 'qryn',
    image_url: '/dest/qryn.svg',
  },
  {
    type: 'managed',
    display_name: 'AWS S3',
    image_url: '/dest/s3.svg',
  },
  {
    type: 'managed',
    display_name: 'Splunk',
    image_url: '/dest/splunk.svg',
  },
  {
    type: 'self hosted',
    display_name: 'Jaeger',
    image_url: '/dest/jaeger.svg',
  },
  {
    type: 'self hosted',
    display_name: 'Loki',
    image_url: '/dest/loki.svg',
  },
  {
    type: 'self hosted',
    display_name: 'Prometheus',
    image_url: '/dest/prometheus.svg',
  },
  {
    type: 'self hosted',
    display_name: 'SigNoz',
    image_url: '/dest/signoz.svg',
  },
  {
    type: 'self hosted',
    display_name: 'Tempo',
    image_url: '/dest/tempo.svg',
  },
  {
    type: 'managed',
    display_name: 'Azure Blob Storage',
    image_url: '/dest/blobstorage.svg',
  },
  {
    type: 'managed',
    display_name: 'Chronosphere',
    image_url: '/dest/chronosphere.svg',
  },
  {
    type: 'managed',
    display_name: 'Datadog',
    image_url: '/dest/datadog.svg',
  },
  {
    type: 'managed',
    display_name: 'Dynatrace',
    image_url: '/dest/dynatrace.svg',
  },
  {
    type: 'managed',
    display_name: 'Google Cloud Monitoring',
    image_url: '/dest/gcp.svg',
  },
  // {
  //   type: 'managed',
  //   display_name: 'Grafana Cloud Loki',
  //   image_url: '/dest/grafana.svg',
  // },
  // {
  //   type: 'managed',
  //   display_name: 'Grafana Cloud Prometheus',
  //   image_url: '/dest/grafana.svg',
  // },
  {
    type: 'managed',
    display_name: 'Grafana Cloud Tempo',
    image_url: '/dest/grafana.svg',
  },
  {
    type: 'managed',
    display_name: 'Honeycomb',
    image_url: '/dest/honeycomb.svg',
  },
  {
    type: 'managed',
    display_name: 'Lightstep',
    image_url: '/dest/lightstep.svg',
  },
  {
    type: 'managed',
    display_name: 'Logz.io',
    image_url: '/dest/logzio.svg',
  },
  {
    type: 'managed',
    display_name: 'Middleware',
    image_url: '/dest/middleware.svg',
  },
  {
    type: 'managed',
    display_name: 'New Relic',
    image_url: '/dest/newrelic.svg',
  },
  {
    type: 'managed',
    display_name: 'OpsVerse',
    image_url: '/dest/opsverse.svg',
  },
  {
    type: 'managed',
    display_name: 'qryn',
    image_url: '/dest/qryn.svg',
  },
  {
    type: 'managed',
    display_name: 'AWS S3',
    image_url: '/dest/s3.svg',
  },
  {
    type: 'managed',
    display_name: 'Splunk',
    image_url: '/dest/splunk.svg',
  },
  {
    type: 'self hosted',
    display_name: 'Jaeger',
    image_url: '/dest/jaeger.svg',
  },
  {
    type: 'self hosted',
    display_name: 'Loki',
    image_url: '/dest/loki.svg',
  },
  {
    type: 'self hosted',
    display_name: 'Prometheus',
    image_url: '/dest/prometheus.svg',
  },
  {
    type: 'self hosted',
    display_name: 'SigNoz',
    image_url: '/dest/signoz.svg',
  },
  {
    type: 'self hosted',
    display_name: 'Tempo',
    image_url: '/dest/tempo.svg',
  },
  {
    type: 'managed',
    display_name: 'Azure Blob Storage',
    image_url: '/dest/blobstorage.svg',
  },
  {
    type: 'managed',
    display_name: 'Chronosphere',
    image_url: '/dest/chronosphere.svg',
  },
  {
    type: 'managed',
    display_name: 'Datadog',
    image_url: '/dest/datadog.svg',
  },
  {
    type: 'managed',
    display_name: 'Dynatrace',
    image_url: '/dest/dynatrace.svg',
  },
  {
    type: 'managed',
    display_name: 'Google Cloud Monitoring',
    image_url: '/dest/gcp.svg',
  },
  // {
  //   type: 'managed',
  //   display_name: 'Grafana Cloud Loki',
  //   image_url: '/dest/grafana.svg',
  // },
  // {
  //   type: 'managed',
  //   display_name: 'Grafana Cloud Prometheus',
  //   image_url: '/dest/grafana.svg',
  // },
  {
    type: 'managed',
    display_name: 'Grafana Cloud Tempo',
    image_url: '/dest/grafana.svg',
  },
  {
    type: 'managed',
    display_name: 'Honeycomb',
    image_url: '/dest/honeycomb.svg',
  },
  {
    type: 'managed',
    display_name: 'Lightstep',
    image_url: '/dest/lightstep.svg',
  },
  {
    type: 'managed',
    display_name: 'Logz.io',
    image_url: '/dest/logzio.svg',
  },
  {
    type: 'managed',
    display_name: 'Middleware',
    image_url: '/dest/middleware.svg',
  },
  {
    type: 'managed',
    display_name: 'New Relic',
    image_url: '/dest/newrelic.svg',
  },
  {
    type: 'managed',
    display_name: 'OpsVerse',
    image_url: '/dest/opsverse.svg',
  },
  {
    type: 'managed',
    display_name: 'qryn',
    image_url: '/dest/qryn.svg',
  },
  {
    type: 'managed',
    display_name: 'AWS S3',
    image_url: '/dest/s3.svg',
  },
  {
    type: 'managed',
    display_name: 'Splunk',
    image_url: '/dest/splunk.svg',
  },
  {
    type: 'self hosted',
    display_name: 'Jaeger',
    image_url: '/dest/jaeger.svg',
  },
  {
    type: 'self hosted',
    display_name: 'Loki',
    image_url: '/dest/loki.svg',
  },
  {
    type: 'self hosted',
    display_name: 'Prometheus',
    image_url: '/dest/prometheus.svg',
  },
  {
    type: 'self hosted',
    display_name: 'SigNoz',
    image_url: '/dest/signoz.svg',
  },
  {
    type: 'self hosted',
    display_name: 'Tempo',
    image_url: '/dest/tempo.svg',
  },
  {
    type: 'managed',
    display_name: 'Azure Blob Storage',
    image_url: '/dest/blobstorage.svg',
  },
];

export default brandData;
