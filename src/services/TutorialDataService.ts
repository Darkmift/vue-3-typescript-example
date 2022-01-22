import Tutorial from "../types/Tutorial";
import * as utils from "../utils/uuid";

let tutorials: Tutorial[] = [];

/* eslint-disable */
class TutorialDataService {
  getAll(): Promise<Tutorial[]> {
    return Promise.resolve(tutorials);
  }

  get(id: any): Promise<Tutorial | undefined> {
    return Promise.resolve(tutorials.find((tutorial) => tutorial.id === id));
  }

  create(data: Tutorial): Promise<any> {
    data.id = utils.uuidv4();
    tutorials.push(data);
    return Promise.resolve(tutorials.find((tutorial) => tutorial.id === data.id));
  }

  update(id: string, data: Tutorial): Promise<Tutorial | undefined> {
    if (!id) return Promise.reject();
    const targetIdx = tutorials.findIndex((tutorial) => tutorial.id === id);
    if (targetIdx === -1) {
      return Promise.resolve(undefined);
    }

    tutorials[targetIdx] = {
      ...tutorials[targetIdx],
      ...data,
    };
    return Promise.resolve(tutorials[targetIdx]);
  }

  delete(id: any): Promise<number> {
    tutorials = tutorials.filter((tutorial) => tutorial.id != id);
    return Promise.resolve(tutorials.findIndex((tutorial) => tutorial.id === id));
  }

  deleteAll(): Promise<boolean> {
    tutorials = [];
    return Promise.resolve(true);
  }

  findByTitle(title: string): Promise<Tutorial[]> {
    return Promise.resolve(tutorials.filter((tutorial) => tutorial.title.includes(title)));
  }
}

export default new TutorialDataService();
