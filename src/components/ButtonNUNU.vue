<template>
  <div>
    <div
      :class='this.class + " buttonBorder border-gray-200 shadow-sm bg-[#f6f6f6] flex w-fit py-1 px-4 rounded text-xs cursor-pointer"'
      @onclick="this.onClick">{{ this.title }}<svg-icon v-if="this.icon != null" type="mdi" :path="this.icon" class="mr-2" :size="small"></svg-icon></div>
  </div>
</template>

<script>
import SvgIcon from '@jamescoyle/vue-icon'
import { mdiPlus, mdiFolder, mdiBookmark, mdiClose, mdiRepeatVariant, mdiPencil, mdiHome, mdiCircleSmall } from '@mdi/js'

export default {
  name: 'ButtonNUNU',
  props: ["icon", "title", "onClick", "class"],
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
.buttonBorder {
  border-width: 1px
}
</style>