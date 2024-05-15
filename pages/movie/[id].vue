<script lang="ts" setup>
import localImagePath from "~/assets/img/image-not-found.jpeg";
import { formatNumber } from "~/utils/formatter/formatNumber";
import { formatCurrency } from "~/utils/formatter/formatCurrency";
import {
  useMovieById,
  useMovieVideoById,
  useMovieRecommendation,
  useMovieCast,
} from "~/composables/useMovies";
import type { TMovieDetail, TVideo, TVideos, TCast, TRecommendation } from "~/types/Movies";

const route = useRoute();
const movieId = route.params.id;

const isLoadCast = ref<boolean>(false);
const isLoadRecommendationnn = ref<boolean>(false);

const loadMovieCastData = async () => {
  isLoadCast.value = true;
  const data = await useMovieCast(movieId);
  if (data) {
    isLoadCast.value = false;
  }
  return data;
};

const loadMovieRecommendationData = async () => {
  isLoadRecommendationnn.value = true;
  const data = await useMovieRecommendation(movieId);
  if (data) {
    isLoadRecommendationnn.value = false;
  }
  return data;
};

const movie = (await useMovieById(movieId)) as TMovieDetail;
const video = (await useMovieVideoById(movieId)) as TVideo;
const cast = (await loadMovieCastData()) as TCast;
const recommendationMovie = (await loadMovieRecommendationData()) as TRecommendation;

const handleImageError = (e: Event) => {
  const target = e.target as HTMLImageElement;
  target.src = localImagePath;
};

let videoTrailer = video.results.find((item: TVideos) => item.name.includes("Official Trailer"));
if (!videoTrailer) {
  videoTrailer = video.results[0];
}
</script>
<template>
  <div
    v-if="movie"
    class="m-0"
  >
    <div class="mt-6 mx-6">
      <div class="text-2xl md:text-[38px] leading-10 mb-4 font-bold">
        {{ movie.title }}
      </div>
      <div class="block md:flex">
        <div>
          <img
            :src="`https://image.tmdb.org/t/p/original${movie.poster_path}`"
            :alt="`movie-${movie.id}`"
            class="rounded-xl max-w-none w-[196px] h-[291px] flex mx-auto md:mx-0"
            @error="(e) => handleImageError(e)"
          />
        </div>
        <div class="py-8 md:py-4 md:px-6">
          <div
            v-if="movie.genres.length > 0"
            class="flex text-xs font-semibold"
          >
            <div
              v-for="item in movie.genres"
              :key="item.id"
              class="mr-4 text-black font-medium border-[1px] border-solid border-black py-1 px-3 rounded-full"
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
          <div class="w-full md:w-[80%] mt-4 text-sm font-medium text-black leading-[21.09px]">
            {{ movie.overview }}
          </div>
          <div class="block md:flex py-8">
            <div class="">
              <div class="font-base">IMDB Rating</div>
              <div class="flex items-center text-black text-md mr-4">
                <img
                  src="~assets/img/star.svg"
                  alt="star"
                  class="w-8 h-4"
                />
                {{ formatNumber(movie.vote_average) }}
                <span class="text-[#636363] text-sm">/10</span>
              </div>
            </div>
            <div class="flex items-center text-sm text-[#636363] ml-2">
              {{ formatCurrency(movie.vote_count) }} Reviews
            </div>
          </div>
        </div>
        <div v-if="videoTrailer !== undefined">
          <iframe
            :src="`https://www.youtube.com/embed/${videoTrailer.key}?controls=0&modestbranding=1&playsinline=1&rel=0&enablejsapi=1`"
            :title="videoTrailer.name"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen
          ></iframe>
        </div>
      </div>
    </div>

    <div class="mt-10 mx-6">
      <common-slider-section
        title="Cast"
        :data="cast?.cast"
        :placeholder="isLoadCast"
      />

      <common-slider-section
        title="Related Movies"
        :data="recommendationMovie?.results"
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

iframe {
  width: 521px;
  height: 291px;
  border-radius: 2rem;

  @media (max-width: 768px) {
    width: 100%;
    height: 250px;
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
