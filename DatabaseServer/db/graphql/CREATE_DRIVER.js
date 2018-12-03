const neo4j = require('neo4j-driver').v1;
const driver = neo4j.driver("bolt://localhost:7687", neo4j.auth.basic("neo4j", "password123"));

driver.onCompleted = () => {
  console.log('Driver created');
  driver.close();
};

driver.onError = error => {
  console.log(error);
  driver.close();
};