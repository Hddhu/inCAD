<template>
<div>
    <div class="bg-primary flex w-fit py-1 px-4 rounded text-xs cursor-pointer" @onclick="this.onClick"><svg-icon v-if="this.icon != null" type="mdi" :path="this.icon" class="mr-2"></svg-icon>{{ this.title }}</div>
</div>
  </template>
  
  <script>
  import SvgIcon from '@jamescoyle/vue-icon'
import { mdiPlus, mdiFolder, mdiBookmark, mdiClose, mdiRepeatVariant, mdiPencil, mdiHome, mdiCircleSmall } from '@mdi/js'
  
  export default {
    name: 'ButtonNUNU',
    props: ["icon", "title", "onClick"],
    data: () => ({
      
    }),
    methods: {
    },
    components: {
      SvgIcon
    }
  }
  </script>
  
  <style>

  </style>
  