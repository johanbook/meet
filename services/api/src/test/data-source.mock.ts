class MockEntityData {
  find() {
    return false;
  }
}

export class DataSourceMock {
  entityMetadatas = [MockEntityData];

  getRepository() {
    return false;
  }

  options = {
    type: "postgres",
  };
}

export function createDataSourceMock(): any {
  return new DataSourceMock();
}
