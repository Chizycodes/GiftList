const axios = require('axios');
const niceList = require('../utils/niceList.json');
const MerkleTree = require('../utils/MerkleTree');

const serverUrl = 'http://localhost:1225';

async function main() {
	// TODO: how do we prove to the server we're on the nice list?
	const tree = new MerkleTree(niceList);
	const root = tree.getRoot();
	const leaf = 'Miss Margarita Lowe Sr.';
	const proof = tree.getProof(1);

	const { data: gift } = await axios.post(`${serverUrl}/gift`, {
		proof,
		leaf,
		root,
	});

	console.log({ gift });
}

main();
