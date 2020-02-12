import { NextApiResponse, NextApiRequest } from 'next';
import fetch from 'isomorphic-unfetch';
import { FragmentUtil } from 'utils/fragment';

export const get = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { id },
  } = req;

  const cmsData = (await fetch(`${process.env.CMS}/tapps?tapp=${id}`).then(res => res.json()))[0];

  if (!cmsData) return res.status(404).end();

  const tapp = {
    title: cmsData.title,
    description: cmsData.description,
  };

  const fragment = await fetch(`${process.env.GATEWAY}/fragments/tapps-io$tapp.${cmsData.tapp}@${cmsData.semver}`).then(
    res => {
      return res.text().then(prerender => ({
        ...tapp,
        prerender,
        version: res.headers.get('x-version'),
        ...FragmentUtil.splitLink(res.headers.get('link') || ''),
      }));
    },
  );

  res.send(fragment);
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'GET':
      return get(req, res);
    default:
      return res.status(405).end();
  }
};
