import { Brand } from '@/types/brand';

const brandData: any[] = [
  {
    type: 'managed',
    display_name: 'Chronosphere',
    image_url: 'https:/d15jtxgb40qetw.cloudfront.net/chronosphere.svg',
  },
  {
    type: 'managed',
    display_name: 'Datadog',
    image_url: 'https:/d15jtxgb40qetw.cloudfront.net/datadog.svg',
  },
  {
    type: 'managed',
    display_name: 'Dynatrace',
    image_url: 'https:/d15jtxgb40qetw.cloudfront.net/dynatrace.svg',
  },
  {
    type: 'managed',
    display_name: 'Google Cloud Monitoring',
    image_url: 'https:/d15jtxgb40qetw.cloudfront.net/gcp.svg',
  },
  // {
  //   type: 'managed',
  //   display_name: 'Grafana Cloud Loki',
  //   image_url: 'https:/d15jtxgb40qetw.cloudfront.net/grafana.svg',
  // },
  // {
  //   type: 'managed',
  //   display_name: 'Grafana Cloud Prometheus',
  //   image_url: 'https:/d15jtxgb40qetw.cloudfront.net/grafana.svg',
  // },
  {
    type: 'managed',
    display_name: 'Grafana Cloud Tempo',
    image_url: 'https:/d15jtxgb40qetw.cloudfront.net/grafana.svg',
  },
  {
    type: 'managed',
    display_name: 'Honeycomb',
    image_url: 'https:/d15jtxgb40qetw.cloudfront.net/honeycomb.svg',
  },
  {
    type: 'managed',
    display_name: 'Lightstep',
    image_url: 'https:/d15jtxgb40qetw.cloudfront.net/lightstep.svg',
  },
  {
    type: 'managed',
    display_name: 'Logz.io',
    image_url: 'https:/d15jtxgb40qetw.cloudfront.net/logzio.svg',
  },
  {
    type: 'managed',
    display_name: 'Middleware',
    image_url: 'https:/d15jtxgb40qetw.cloudfront.net/middleware.svg',
  },
  {
    type: 'managed',
    display_name: 'New Relic',
    image_url: 'https:/d15jtxgb40qetw.cloudfront.net/newrelic.svg',
  },
  {
    type: 'managed',
    display_name: 'OpsVerse',
    image_url: 'https:/d15jtxgb40qetw.cloudfront.net/opsverse.svg',
  },
  {
    type: 'managed',
    display_name: 'qryn',
    image_url: 'https:/d15jtxgb40qetw.cloudfront.net/qryn.svg',
  },
  {
    type: 'managed',
    display_name: 'AWS S3',
    image_url: 'https:/d15jtxgb40qetw.cloudfront.net/s3.svg',
  },
  {
    type: 'managed',
    display_name: 'Splunk',
    image_url: 'https:/d15jtxgb40qetw.cloudfront.net/splunk.svg',
  },
  {
    type: 'self hosted',
    display_name: 'Jaeger',
    image_url: 'https:/d15jtxgb40qetw.cloudfront.net/jaeger.svg',
  },
  {
    type: 'self hosted',
    display_name: 'Loki',
    image_url: 'https:/d15jtxgb40qetw.cloudfront.net/loki.svg',
  },
  {
    type: 'self hosted',
    display_name: 'Prometheus',
    image_url: 'https:/d15jtxgb40qetw.cloudfront.net/prometheus.svg',
  },
  {
    type: 'self hosted',
    display_name: 'SigNoz',
    image_url: 'https:/d15jtxgb40qetw.cloudfront.net/signoz.svg',
  },
  {
    type: 'self hosted',
    display_name: 'Tempo',
    image_url: 'https:/d15jtxgb40qetw.cloudfront.net/tempo.svg',
  },
  {
    type: 'managed',
    display_name: 'Azure Blob Storage',
    image_url: 'https:/d15jtxgb40qetw.cloudfront.net/blobstorage.svg',
  },
  {
    type: 'managed',
    display_name: 'Chronosphere',
    image_url: 'https:/d15jtxgb40qetw.cloudfront.net/chronosphere.svg',
  },
  {
    type: 'managed',
    display_name: 'Datadog',
    image_url: 'https:/d15jtxgb40qetw.cloudfront.net/datadog.svg',
  },
  {
    type: 'managed',
    display_name: 'Dynatrace',
    image_url: 'https:/d15jtxgb40qetw.cloudfront.net/dynatrace.svg',
  },
  {
    type: 'managed',
    display_name: 'Google Cloud Monitoring',
    image_url: 'https:/d15jtxgb40qetw.cloudfront.net/gcp.svg',
  },
  // {
  //   type: 'managed',
  //   display_name: 'Grafana Cloud Loki',
  //   image_url: 'https:/d15jtxgb40qetw.cloudfront.net/grafana.svg',
  // },
  // {
  //   type: 'managed',
  //   display_name: 'Grafana Cloud Prometheus',
  //   image_url: 'https:/d15jtxgb40qetw.cloudfront.net/grafana.svg',
  // },
  {
    type: 'managed',
    display_name: 'Grafana Cloud Tempo',
    image_url: 'https:/d15jtxgb40qetw.cloudfront.net/grafana.svg',
  },
  {
    type: 'managed',
    display_name: 'Honeycomb',
    image_url: 'https:/d15jtxgb40qetw.cloudfront.net/honeycomb.svg',
  },
  {
    type: 'managed',
    display_name: 'Lightstep',
    image_url: 'https:/d15jtxgb40qetw.cloudfront.net/lightstep.svg',
  },
  {
    type: 'managed',
    display_name: 'Logz.io',
    image_url: 'https:/d15jtxgb40qetw.cloudfront.net/logzio.svg',
  },
  {
    type: 'managed',
    display_name: 'Middleware',
    image_url: 'https:/d15jtxgb40qetw.cloudfront.net/middleware.svg',
  },
  {
    type: 'managed',
    display_name: 'New Relic',
    image_url: 'https:/d15jtxgb40qetw.cloudfront.net/newrelic.svg',
  },
  {
    type: 'managed',
    display_name: 'OpsVerse',
    image_url: 'https:/d15jtxgb40qetw.cloudfront.net/opsverse.svg',
  },
  {
    type: 'managed',
    display_name: 'qryn',
    image_url: 'https:/d15jtxgb40qetw.cloudfront.net/qryn.svg',
  },
  {
    type: 'managed',
    display_name: 'AWS S3',
    image_url: 'https:/d15jtxgb40qetw.cloudfront.net/s3.svg',
  },
  {
    type: 'managed',
    display_name: 'Splunk',
    image_url: 'https:/d15jtxgb40qetw.cloudfront.net/splunk.svg',
  },
  {
    type: 'self hosted',
    display_name: 'Jaeger',
    image_url: 'https:/d15jtxgb40qetw.cloudfront.net/jaeger.svg',
  },
  {
    type: 'self hosted',
    display_name: 'Loki',
    image_url: 'https:/d15jtxgb40qetw.cloudfront.net/loki.svg',
  },
  {
    type: 'self hosted',
    display_name: 'Prometheus',
    image_url: 'https:/d15jtxgb40qetw.cloudfront.net/prometheus.svg',
  },
  {
    type: 'self hosted',
    display_name: 'SigNoz',
    image_url: 'https:/d15jtxgb40qetw.cloudfront.net/signoz.svg',
  },
  {
    type: 'self hosted',
    display_name: 'Tempo',
    image_url: 'https:/d15jtxgb40qetw.cloudfront.net/tempo.svg',
  },
  {
    type: 'managed',
    display_name: 'Azure Blob Storage',
    image_url: 'https:/d15jtxgb40qetw.cloudfront.net/blobstorage.svg',
  },
  {
    type: 'managed',
    display_name: 'Chronosphere',
    image_url: 'https:/d15jtxgb40qetw.cloudfront.net/chronosphere.svg',
  },
  {
    type: 'managed',
    display_name: 'Datadog',
    image_url: 'https:/d15jtxgb40qetw.cloudfront.net/datadog.svg',
  },
  {
    type: 'managed',
    display_name: 'Dynatrace',
    image_url: 'https:/d15jtxgb40qetw.cloudfront.net/dynatrace.svg',
  },
  {
    type: 'managed',
    display_name: 'Google Cloud Monitoring',
    image_url: 'https:/d15jtxgb40qetw.cloudfront.net/gcp.svg',
  },
  // {
  //   type: 'managed',
  //   display_name: 'Grafana Cloud Loki',
  //   image_url: 'https:/d15jtxgb40qetw.cloudfront.net/grafana.svg',
  // },
  // {
  //   type: 'managed',
  //   display_name: 'Grafana Cloud Prometheus',
  //   image_url: 'https:/d15jtxgb40qetw.cloudfront.net/grafana.svg',
  // },
  {
    type: 'managed',
    display_name: 'Grafana Cloud Tempo',
    image_url: 'https:/d15jtxgb40qetw.cloudfront.net/grafana.svg',
  },
  {
    type: 'managed',
    display_name: 'Honeycomb',
    image_url: 'https:/d15jtxgb40qetw.cloudfront.net/honeycomb.svg',
  },
  {
    type: 'managed',
    display_name: 'Lightstep',
    image_url: 'https:/d15jtxgb40qetw.cloudfront.net/lightstep.svg',
  },
  {
    type: 'managed',
    display_name: 'Logz.io',
    image_url: 'https:/d15jtxgb40qetw.cloudfront.net/logzio.svg',
  },
  {
    type: 'managed',
    display_name: 'Middleware',
    image_url: 'https:/d15jtxgb40qetw.cloudfront.net/middleware.svg',
  },
  {
    type: 'managed',
    display_name: 'New Relic',
    image_url: 'https:/d15jtxgb40qetw.cloudfront.net/newrelic.svg',
  },
  {
    type: 'managed',
    display_name: 'OpsVerse',
    image_url: 'https:/d15jtxgb40qetw.cloudfront.net/opsverse.svg',
  },
  {
    type: 'managed',
    display_name: 'qryn',
    image_url: 'https:/d15jtxgb40qetw.cloudfront.net/qryn.svg',
  },
  {
    type: 'managed',
    display_name: 'AWS S3',
    image_url: 'https:/d15jtxgb40qetw.cloudfront.net/s3.svg',
  },
  {
    type: 'managed',
    display_name: 'Splunk',
    image_url: 'https:/d15jtxgb40qetw.cloudfront.net/splunk.svg',
  },
  {
    type: 'self hosted',
    display_name: 'Jaeger',
    image_url: 'https:/d15jtxgb40qetw.cloudfront.net/jaeger.svg',
  },
  {
    type: 'self hosted',
    display_name: 'Loki',
    image_url: 'https:/d15jtxgb40qetw.cloudfront.net/loki.svg',
  },
  {
    type: 'self hosted',
    display_name: 'Prometheus',
    image_url: 'https:/d15jtxgb40qetw.cloudfront.net/prometheus.svg',
  },
  {
    type: 'self hosted',
    display_name: 'SigNoz',
    image_url: 'https:/d15jtxgb40qetw.cloudfront.net/signoz.svg',
  },
  {
    type: 'self hosted',
    display_name: 'Tempo',
    image_url: 'https:/d15jtxgb40qetw.cloudfront.net/tempo.svg',
  },
  {
    type: 'managed',
    display_name: 'Azure Blob Storage',
    image_url: 'https:/d15jtxgb40qetw.cloudfront.net/blobstorage.svg',
  },
  {
    type: 'managed',
    display_name: 'Chronosphere',
    image_url: 'https:/d15jtxgb40qetw.cloudfront.net/chronosphere.svg',
  },
  {
    type: 'managed',
    display_name: 'Datadog',
    image_url: 'https:/d15jtxgb40qetw.cloudfront.net/datadog.svg',
  },
  {
    type: 'managed',
    display_name: 'Dynatrace',
    image_url: 'https:/d15jtxgb40qetw.cloudfront.net/dynatrace.svg',
  },
  {
    type: 'managed',
    display_name: 'Google Cloud Monitoring',
    image_url: 'https:/d15jtxgb40qetw.cloudfront.net/gcp.svg',
  },
  // {
  //   type: 'managed',
  //   display_name: 'Grafana Cloud Loki',
  //   image_url: 'https:/d15jtxgb40qetw.cloudfront.net/grafana.svg',
  // },
  // {
  //   type: 'managed',
  //   display_name: 'Grafana Cloud Prometheus',
  //   image_url: 'https:/d15jtxgb40qetw.cloudfront.net/grafana.svg',
  // },
  {
    type: 'managed',
    display_name: 'Grafana Cloud Tempo',
    image_url: 'https:/d15jtxgb40qetw.cloudfront.net/grafana.svg',
  },
  {
    type: 'managed',
    display_name: 'Honeycomb',
    image_url: 'https:/d15jtxgb40qetw.cloudfront.net/honeycomb.svg',
  },
  {
    type: 'managed',
    display_name: 'Lightstep',
    image_url: 'https:/d15jtxgb40qetw.cloudfront.net/lightstep.svg',
  },
  {
    type: 'managed',
    display_name: 'Logz.io',
    image_url: 'https:/d15jtxgb40qetw.cloudfront.net/logzio.svg',
  },
  {
    type: 'managed',
    display_name: 'Middleware',
    image_url: 'https:/d15jtxgb40qetw.cloudfront.net/middleware.svg',
  },
  {
    type: 'managed',
    display_name: 'New Relic',
    image_url: 'https:/d15jtxgb40qetw.cloudfront.net/newrelic.svg',
  },
  {
    type: 'managed',
    display_name: 'OpsVerse',
    image_url: 'https:/d15jtxgb40qetw.cloudfront.net/opsverse.svg',
  },
  {
    type: 'managed',
    display_name: 'qryn',
    image_url: 'https:/d15jtxgb40qetw.cloudfront.net/qryn.svg',
  },
  {
    type: 'managed',
    display_name: 'AWS S3',
    image_url: 'https:/d15jtxgb40qetw.cloudfront.net/s3.svg',
  },
  {
    type: 'managed',
    display_name: 'Splunk',
    image_url: 'https:/d15jtxgb40qetw.cloudfront.net/splunk.svg',
  },
  {
    type: 'self hosted',
    display_name: 'Jaeger',
    image_url: 'https:/d15jtxgb40qetw.cloudfront.net/jaeger.svg',
  },
  {
    type: 'self hosted',
    display_name: 'Loki',
    image_url: 'https:/d15jtxgb40qetw.cloudfront.net/loki.svg',
  },
  {
    type: 'self hosted',
    display_name: 'Prometheus',
    image_url: 'https:/d15jtxgb40qetw.cloudfront.net/prometheus.svg',
  },
  {
    type: 'self hosted',
    display_name: 'SigNoz',
    image_url: 'https:/d15jtxgb40qetw.cloudfront.net/signoz.svg',
  },
  {
    type: 'self hosted',
    display_name: 'Tempo',
    image_url: 'https:/d15jtxgb40qetw.cloudfront.net/tempo.svg',
  },
  {
    type: 'managed',
    display_name: 'Azure Blob Storage',
    image_url: 'https:/d15jtxgb40qetw.cloudfront.net/blobstorage.svg',
  },
];

export default brandData;
