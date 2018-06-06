import Axios from 'axios'

export default {
  methods: {
    onChange (event) {
      this.file = event.target.files[0]
      this.$emit('change', this.file)
    },
    async upload () {
      try {
        if (!this.file) {
          throw new Error('no file')
        }
        let formData = new FormData()
        formData.append(this.name, this.file, this.file.name)
        this.isUploading = true
        const { data } = await Axios.post(this.url, formData)
        if (!data) {
          throw new Error('no data')
        }
        this.file = null
        this.isUploading = false
        this.$emit('upload-success', data)
      } catch (err) {
        console.log(`${err.name}: ${err.message}`)
        this.$emit('upload-failure', err)
      }
    }
  },
  props: {
    accept: {
      default: 'image/*',
      type: String
    },
    name: {
      required: true,
      type: String
    },
    label: {
      default: 'Drag your file here to begin or click to browse',
      type: String
    },
    url: {
      required: true,
      type: String
    },
    value: {
      required: true,
      type: Boolean
    }
  },
  watch: {
    value (v) {
      if (v) {
        this.upload().then(() => {
          this.$emit('input', false)
        })
      }
    }
  },
  data () {
    return {
      file: null,
      isUploading: false
    }
  }
}
