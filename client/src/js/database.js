import { openDB } from 'idb';

const initdb = async () =>
	openDB('jate', 1, {
		upgrade(db) {
			if (db.objectStoreNames.contains('jate')) {
				console.log('jate database already exists');
				return;
			}
			db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
			console.log('jate database created');
		},
	});


export const putDb = async (content) => {
	console.log('Posted to database');
	// Creates a connection to the charizard database and version.
	const charizardDb = await openDB('charizard', 1);

	// Creates a new transaction and specifies the database and data privileges.
	const tx = charizardDb.transaction('charizard', 'readwrite');

	// Opens up the desired object store.
	const store = tx.objectStore('charizard');

	// Uses the .put() method on the store and passes in the content.
	const request = store.put({ id: 1, charizard: content });

	// Gets confirmation of the request.
	const result = await request;
	console.log('Data saved to the database:', result.values);
};


export const getDb = async () => {
  console.log("Get all notes from the database");

  // Creates a connection to the charizard database and version.
  const charizardDb = await openDB("charizard", 1);

  // Creates a new transaction and specifies the database and data privileges.
  const tx = charizardDb.transaction("charizard", "readonly");

  // Opens up the desired object store.
  const store = tx.objectStore("charizard");

  // Uses the .get(1) method to retrieve the value of the first record matching the query.

  const request = store.get(1);

  // Gets confirmation of the request.
  const result = await request;
  result
    ? console.log("Notes retrieved from database:", result.charizard)
    : console.log("No notes found in database!");
  return result?.charizard;
};

initdb();
