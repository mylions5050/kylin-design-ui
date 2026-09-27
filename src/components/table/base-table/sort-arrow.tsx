import { defineComponent } from 'vue'

/** Sort-direction indicator arrow rendered inside sortable header cells. Rotated via the parent's `is-desc` modifier. */
export default defineComponent({
  name: 'SortArrow',
  setup() {
    return () => (
      <svg
        width="12"
        height="12"
        viewBox="0 0 12 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M6 9.5V2.5"
          stroke="currentColor"
          stroke-width="1.25"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M2.5 6L6 2.5L9.5 6"
          stroke="currentColor"
          stroke-width="1.25"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    )
  },
})
