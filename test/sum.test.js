import {jest} from "@jest/globals";

const sum = require('../src/store/modules/sum');
import NeoEntity from '../src/store/modules/NeoEntity';
jest.mock('../src/store/modules/NeoEntity')
test('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3);
});

test('test getListAll', async ()=>{
    expect.assertions(1);
    await NeoEntity.actions.getListAll();
   expect(NeoEntity.state.allEntitiesAndRelations.categories).toBe(3);
});
