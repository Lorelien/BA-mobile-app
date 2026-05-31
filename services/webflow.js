export const WEBFLOW_TOKEN = '016d4511368b6fa0a830f9772abf58c49caca556ab1d762f9ca080e526532b99 ';
export const NEWS_COLLECTION_ID = '6a11a8bf21801b318973f8f8';
export const CAMPUS_COLLECTION_ID = '6a11ba2ee03b5355137c3d6b';
export const COURSE_COLLECTION_ID = '6a1337695b4a27b8e050fffc';

async function fetchCollectionItems(collectionId, label) {
  const response = await fetch(
    `https://api.webflow.com/v2/collections/${collectionId}/items/live`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${WEBFLOW_TOKEN}`,
        accept: 'application/json',
      },
    }
  );

  const niveauMap = {
  'b8776b89c98676dae45f5b2a4e7910bf': 'Duaal',
  '4801226ad7e3bc34070b095fe9471b5d': 'A-stroom',
  'cf698edb9d595658cf8607bdb30c224f': 'B-stroom',
  '4e3a3eb4c8ad787a814f22c841858076': 'Hoger onderwijs',
};

const interesseMap = {
  '1ae470322cfc3d1988040a4bd9c630bb': 'Technologie',
  '09df63966ad0c15e74e485941f65991c': 'Taal',
  '69388d6b9f024e16650540d98c80f4e8': 'Maatschappij',
  '7ba88edd26c56a336754fd49afcd7520': 'Zorg',
  '199c0b77334ddbceeb111afcf8912b2d': 'Wetenschap',
  '549aaeea34dedf319469eb1d4bd700a4': 'Kunst',
  'ee0b1493af6cb8bbd3c8b1520a9f187f': 'Sport',
};

  const text = await response.text();
  console.log(`${label} STATUS:`, response.status);
  console.log(`${label} RESPONSE:`, text);

  if (!response.ok) {
    throw new Error(`${label} fout: ${response.status}`);
  }

  const data = JSON.parse(text);
  console.log(`${label} ITEMS:`, data.items);

  return data.items || [];
}

export async function fetchNews() {
  return fetchCollectionItems(NEWS_COLLECTION_ID, 'NEWS');
}

export async function fetchCampuses() {
  return fetchCollectionItems(CAMPUS_COLLECTION_ID, 'CAMPUS');
}

export async function fetchCourses() {
  return fetchCollectionItems(COURSE_COLLECTION_ID, 'COURSES');
}