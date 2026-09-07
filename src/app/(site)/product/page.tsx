import { permanentRedirect } from 'next/navigation';

/* The product overview merged into the observability page. */
export default function Product() {
  permanentRedirect('/observability');
}
