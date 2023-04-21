<template>
  <div class="p-4">
    <!-- 三個標題卡片 -->
    <div class="row g-4 mb-4">
      <div class="col">
        <div class="card shadow-sm">
          <div class="card-body text-end">
            <h5 class="display-6">收入</h5>
            <p class="income display-4" v-text="totalIncome"></p>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="card shadow-sm">
          <div class="card-body text-end">
            <h5 class="display-6">支出</h5>
            <p class="expenditure display-4"  v-text="totalOutcome"></p>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="card shadow-sm">
          <div class="card-body text-end">
            <h5 class="display-6">盈利</h5>
            <p class="revenue display-4" v-text="totalIncome - totalOutcome"></p>
          </div>
        </div>
      </div>
    </div>

    <!-- 數據圖  -->
    <div class="d-flex justify-content-center">
      <div class="w-75">
        <div class="mb-4" id="cal"></div>
        <div class="mb-4" id="bike"></div>
      </div>
    </div>
  </div>
</template>

<script>
const { VITE_APP_URL, VITE_APP_PATH } = import.meta.env;

export default {
  data() {
    return {
      products: [],
      orders: [],
      income: [],
      outcome: [],
      category: [],
      totalIncome: 0,
      totalOutcome: 0,
    };
  },
  methods: {
    getCount() {
      // C3.js
      const chart = c3.generate({
        bindto: '#cal', // HTML 元素綁定
        data: {
          x: 'x',
          columns: [
            [
              'x',
              '2023-01-01',
              '2023-02-01',
              '2023-03-01',
              '2023-04-01',
              '2023-05-01',
              '2023-06-01',
              '2023-07-01',
              '2023-08-01',
              '2023-09-01',
              '2023-10-01',
              '2023-11-01',
              '2023-12-01',
            ],
            ...this.income,
          ],
        },
        axis: {
          x: {
            type: 'timeseries',
            tick: {
              format: '%Y-%m',
            },
          },
        },
      });

      const bike = c3.generate({
        bindto: '#bike', // HTML 元素綁定
        data: {
          x: 'x',
          columns: [
            [
              'x',
              '2023-01-01',
              '2023-02-01',
              '2023-03-01',
              '2023-04-01',
              '2023-05-01',
              '2023-06-01',
              '2023-07-01',
              '2023-08-01',
              '2023-09-01',
              '2023-10-01',
              '2023-11-01',
              '2023-12-01',
            ],
            ...this.category,
          ],
          type: 'bar',
        },
        axis: {
          x: {
            type: 'timeseries',
            tick: {
              format: '%Y-%m',
            },
          },
        },
        bar: {
          width: {
            ratio: 0.5, // this makes bar width 50% of length between ticks
          },
          // or
          // width: 100 // this makes bar width 100px
        },
      });
    },
    getOrders() {
      this.$http
        .get(`${VITE_APP_URL}api/${VITE_APP_PATH}/admin/orders`)
        .then((res) => {
          if (res.data.success) {
            this.orders = res.data.orders;
            console.log(this.orders);
            this.income = res.data.orders;
            this.income = this.income.map(({
              create_at, products, productAry, ...rest
            }) => rest);
            this.income = this.income.filter((item) => item.is_paid === true);
            const months = Array.from({ length: 12 }, (_, i) => i + 1); // 產生月份的數字陣列 [1, 2, ..., 12]
            const columns = [['總收入', ...months.map(() => 0)]];
            const total = this.income.reduce(
              (acc, cur) => {
                const month = new Date(cur.user.address).getMonth(); // 取得月份，從 0 開始計數
                acc[month + 1] += cur.total; // 將總收入加到對應的位置上
                this.totalIncome += cur.total * 1;
                return acc;
              },
              Array.from({ length: 13 }, () => 0),
            ); // 產生初始值為 0 的陣列，長度為 13 (索引從 1 開始計算)
            columns[0].splice(1, 12, ...total.slice(1)); // 將 total 中的值填入 columns 中
            this.income = columns;
            const outcome = ['支出'];
            const now = new Date();
            const currentMonth = now.getMonth() + 1; // 取得當前月份，因為 getMonth() 回傳的是 0~11，所以要加 1
            for (let i = 1; i <= 12; i += 1) {
              if (i > currentMonth) {
                outcome.push(0);
              } else {
                const cost = Math.floor(Math.random() * 401) + 100;
                this.totalOutcome += cost;
                outcome.push(cost);
              }
            }
            this.income.push(outcome);

            this.category = res.data.orders.map(({ productAry, user }) => ({ productAry, user }));
            this.category = this.category.filter((item) => item.productAry !== undefined);
            this.category = this.category.reduce((acc, cur) => {
              cur.productAry.forEach(({ product }) => {
                const { category } = product;
                const month = new Date(cur.user.address).getMonth();
                const index = acc.findIndex(([cat]) => cat === category);
                if (index === -1) {
                  acc.push([category, ...Array(12).fill(0)]);
                  acc[acc.length - 1][1 + month] += 1;
                } else {
                  acc[index][1 + month] += 1;
                }
              });
              return acc;
            }, []);
            this.getCount();
          }
        })
        .catch((err) => {
          console.log(err);
          alert(err.data);
        });
    },
  },
  mounted() {
    this.getOrders();
  },
};
</script>

<style></style>
