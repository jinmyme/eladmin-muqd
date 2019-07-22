export default {
  data() {
    return {
      loading: true,
      data: [],
      page: 0,
      size: 10,
      total: 0,
      url: '',
      params: {},
      query: {},
      time: 170,
      total:0,//总条数
      per_page:0,//每页显示的条数
      last_page:0,//总页数
      current_page:1,//当前页数,
    }
  },
  methods: {
  }
}
