import { defineStore } from 'pinia';

export const useSearchStore = defineStore({
  id: 'search',
  state: () => ({
    keyword: '',
    popularType: '',
  }),
  actions: {
    updateKeyword(newKeyword: string) {
      this.keyword = newKeyword;
    },
    setPopularType(val: string) {
      this.popularType = val;
    }
  }
});
