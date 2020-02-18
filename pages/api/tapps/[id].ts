import { NextApiResponse, NextApiRequest } from 'next';
import fetch from 'isomorphic-unfetch';
import { FragmentUtil } from 'utils/fragment';
import { GetTappsQuery } from 'generated/graphql';

export const get = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { id },
  } = req;

  const queryData: GetTappsQuery = await fetch(`${process.env.CMS}/tapps?tapp=${id}`).then(res => res.json());

  if (!queryData || !queryData.tapps || !queryData.tapps[0]) return res.status(404).end();

  const tappData = queryData.tapps[0];

  const fragment = await fetch(
    `${process.env.GATEWAY}/fragments/tapps-io$tapp.${tappData.tapp}@${tappData.semver}`,
  ).then(res => {
    return res.text().then(prerender => ({
      ...queryData,
      prerender,
      version: res.headers.get('x-version'),
      ...FragmentUtil.splitLink(res.headers.get('link') || ''),
    }));
  });

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
