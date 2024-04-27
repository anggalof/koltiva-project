<script lang="ts" setup>
import localImagePath from "~/assets/img/image-not-found.jpeg";
import { formatNumber } from "~/utils/formatter/formatNumber";
import { getYear } from "~/utils/formatter/dateTime";
import { useMovieById, useMovieRecommendation, useMovieCast } from "~/composables/useMovies";

const route = useRoute();
const movieId: any = route.params.id;
const element: any = ref(null);
const positionBottom = ref("");
const positionLeft = ref("");
const targetHeight = ref("");

onMounted(() => {
  window.addEventListener("resize", handleResize);
  handleResize();
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", handleResize);
});

const handleResize = () => {
  const widthDetail = element.value.offsetWidth;
  if (widthDetail > 1378) {
    positionBottom.value = "-164px";
    targetHeight.value = "5.5rem";
  } else if (widthDetail <= 1378 && widthDetail >= 1178) {
    positionBottom.value = "-192px";
    targetHeight.value = "7rem";
  } else if (widthDetail < 1178 && widthDetail > 768) {
    positionLeft.value = "5%";
    targetHeight.value = "7rem";
  } else {
    positionLeft.value = "auto";
  }
};

const castCredit: any = ref([]);
const isLoadCast = ref<boolean>(false);
const recommendation: any = ref([]);
const isLoadRecommendationnn = ref<boolean>(false);

const loadMovieCastData = async () => {
  isLoadCast.value = true;
  const data: any = await useMovieCast(movieId);
  if (data) {
    isLoadCast.value = false;
  }
  return data;
};

const loadMovieRecommendationData = async () => {
  isLoadRecommendationnn.value = true;
  const data: any = await useMovieRecommendation(movieId);
  if (data) {
    isLoadRecommendationnn.value = false;
  }
  return data;
};

const movie: any = await useMovieById(movieId);
const cast: any = await loadMovieCastData();
castCredit.value = cast?.cast;
const recommendationMovie: any = await loadMovieRecommendationData();
recommendation.value = recommendationMovie?.results;

const handleImageError = (e: any) => {
  e.target.src = localImagePath;
};
</script>
<template>
  <div
    v-if="movie"
    ref="element"
    class="m-0"
  >
    <div
      class="w-full h-[20rem] bg-cover bg-no-repeat bg-center relative"
      :style="{ backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie.backdrop_path}` }"
    >
      <div
        class="absolute w-full h-[20rem] top-0"
        :style="{ backgroundColor: 'rgba(0, 0, 0, 1)', opacity: 0.5 }"
      ></div>
      <div
        class="absolute w-full h-[4.2rem] bottom-0"
        :style="{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }"
      ></div>
      <div
        class="absolute w-full left-auto bottom-auto md:bottom-[-192px] md:left-[10%]"
        :style="{ bottom: positionBottom, left: positionLeft, opacity: 1 }"
      >
        <div class="block md:flex">
          <div>
            <img
              :src="`https://image.tmdb.org/t/p/original${movie.poster_path}`"
              :alt="`movie-${movie.id}`"
              class="rounded-xl max-w-none w-[250px] h-[330px] flex mx-auto md:mx-0 mt-[6rem] md:mt-0"
              @error="(e) => handleImageError(e)"
            />
          </div>
          <div class="py-4 px-6">
            <div class="text-black md:text-white">
              <div
                v-if="movie.genres.length > 0"
                class="flex text-xs font-semibold"
              >
                <div
                  v-for="item in movie.genres"
                  :key="item.id"
                  class="mr-1 bg-white text-black border-2 border-solid border-black p-1 rounded-full"
                >
                  {{ item.name }}
                </div>
              </div>
              <div
                v-else
                class="text-xs font-semibold"
              >
                -
              </div>
              <div class="text-[38px] font-bold">
                {{ movie.title }}
              </div>
              <div
                v-if="movie.release_date !== ''"
                class="text-base font-semibold"
              >
                {{ getYear(movie.release_date) }}
              </div>
              <div
                v-else
                class="text-base font-semibold"
              >
                -
              </div>
            </div>
            <div class="block md:flex pt-0 pb-4 md:py-8">
              <div class="flex items-center text-black md:text-white text-2xl mr-4">
                <img
                  src="~assets/img/star.svg"
                  alt="star"
                  class="w-8 h-4 mr-2"
                />
                {{ formatNumber(movie.vote_average) }}
              </div>
              <div class="more-info">
                <div class="more-top">USER SCORE</div>
                <div class="more-bottom">{{ movie.vote_count }} VOTES</div>
              </div>
              <div class="lh"></div>
              <div class="more-info">
                <div class="more-top">STATUS</div>
                <div class="more-bottom">{{ movie.status }}</div>
              </div>
              <div class="lh"></div>
              <div class="more-info">
                <div class="more-top">LANGUAGE</div>
                <div
                  v-if="movie.spoken_languages.length > 0"
                  class="more-bottom"
                >
                  {{ movie.spoken_languages[0].name }}
                </div>
                <div
                  v-else
                  class="more-bottom"
                >
                  -
                </div>
              </div>
              <div class="lh"></div>
              <div class="more-info">
                <div class="more-top">BUDGET</div>
                <div class="more-bottom">${{ movie.budget }}</div>
              </div>
              <div class="lh"></div>
              <div class="more-info">
                <div class="more-top">PRODUCTION</div>
                <div
                  v-if="movie.production_companies.length > 0"
                  class="more-bottom"
                >
                  {{ movie.production_companies[0].name }}
                </div>
                <div
                  v-else
                  class="more-bottom"
                >
                  -
                </div>
              </div>
            </div>
            <div class="text-[#ff0000] text-xl font-weight">OVERVIEW</div>
            <div
              class="w-full md:w-[60%] mt-2 text-sm font-normal leading-[28px] h-[7rem]"
              :style="{ height: targetHeight }"
            >
              {{ movie.overview }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-[52rem] md:mt-[10rem] mx-6">
      <common-slider-section
        title="Cast"
        :data="castCredit"
        :placeholder="isLoadCast"
      />

      <common-slider-section
        title="Related Movies"
        :data="recommendation"
        :placeholder="isLoadRecommendationnn"
      />
    </div>
  </div>
</template>
<style lang="scss" scoped>
.more-info {
  font-size: 14px;

  .more-top {
    color: #91938f;
  }
  .more-bottom {
    color: #ffffff;
    text-transform: uppercase;

    @media (max-width: 768px) {
      color: #000000;
    }
  }
}

.lh {
  width: 1px;
  height: 2rem;
  background: #ffffff;
  margin: 5px 1.5rem;
  opacity: 0.5;

  @media (max-width: 768px) {
    width: 2rem;
    height: 1px;
    background: #000;
    margin: 5px 0;
  }
}
</style>
