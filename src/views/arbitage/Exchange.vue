<template>
  <div>
    <v-container grid-list-xl fluid pt-2>
      <v-layout row wrap>
        <v-flex xs6 v-for="(card, index) in cards" :key="index">
          <draggable :options="{group: 'card'}">
            <v-card>
              <v-card-actions>
                <v-btn fab small color="primary" @click="addCard()">
                  <v-icon>add</v-icon>
                </v-btn>
                <v-btn fab small color="error" @click="removeCard(index)">
                  <v-icon>remove</v-icon>
                </v-btn>

                <v-select
                  class="ml-5"
                  hide-details
                  v-bind:items="arbitrationCenters"
                  v-model="card.center"
                  label="Select Center"
                  single-line
                  menu-props="bottom"
                  @change="onChangeCenter(index)"
                ></v-select>
                <v-select
                  class="ml-2"
                  hide-details
                  v-bind:items="card.exchangeCoins"
                  v-model="card.exchangeCoin"
                  label="Select Exchange Coin"
                  single-line
                  menu-props="bottom"
                  @change="onChangeExchangeCoin()"
                ></v-select>
              </v-card-actions>
              <v-card-text>
                <v-layout row wrap>
                  <v-flex xs4>
                    <app-card
                      :heading="$t('Buy Orders')"
                      customClasses="elevation-5"
                      :fullScreen="true"
                      :reloadable="true"
                      :closeable="true"
                      :fullBlock="true"
                      :footer="true"
                    >
                      <v-data-table v-bind:headers="headers" :items="items" hide-actions>
                        <template slot="items" slot-scope="props">
                          <td>{{ props.item.price }}</td>
                          <td>{{ props.item.amount }}</td>
                          <td>{{ props.item.total }}</td>
                        </template>
                      </v-data-table>
                    </app-card>
                  </v-flex>
                  <v-flex xs4>
                    <app-card
                      :heading="$t('Sell Orders')"
                      customClasses="elevation-5"
                      :fullScreen="true"
                      :reloadable="true"
                      :closeable="true"
                      :fullBlock="true"
                      :footer="true"
                    >
                      <v-data-table v-bind:headers="headers" :items="items" hide-actions>
                        <template slot="items" slot-scope="props">
                          <td>{{ props.item.price }}</td>
                          <td>{{ props.item.amount }}</td>
                          <td>{{ props.item.total }}</td>
                        </template>
                      </v-data-table>
                    </app-card>
                  </v-flex>
                  <v-flex xs4>
                    <app-card
                      :heading="$t('Order History')"
                      customClasses="elevation-5"
                      :fullScreen="true"
                      :reloadable="true"
                      :closeable="true"
                      :fullBlock="true"
                      :footer="true"
                    >
                      <v-data-table v-bind:headers="headers" :items="items" hide-actions>
                        <template slot="items" slot-scope="props">
                          <td>{{ props.item.price }}</td>
                          <td>{{ props.item.amount }}</td>
                          <td>{{ props.item.total }}</td>
                        </template>
                      </v-data-table>
                    </app-card>
                  </v-flex>
                </v-layout>

                <v-layout row wrap>
                  <v-flex d-flex xs12 sm6 md4>
                    <pie-chart
                      class="evaluation-1"
                      :data="balanceChartData"
                      :colors="['#FFCA28', '#9CCC65']"
                    ></pie-chart>
                  </v-flex>
                  <v-flex d-flex xs12 sm6 md4>
                    <v-layout column wrap justify-center>
                      <v-text-field
                        label="Balance Warning ($)"
                        type="number"
                        v-model="card.balanceWarning"
                      ></v-text-field>
                      <v-text-field
                        label="Ratio Warning (%)"
                        type="number"
                        v-model="card.ratioWarning"
                      ></v-text-field>
                      <div v-if="card.apiKey != ''">
                        <span class="small">ApiKey:</span>
                        <span>{{ card.apiKey }}</span>
                      </div>
                      <v-btn color="primary" @click.stop="dialogApiKey = true">Enter Api Key</v-btn>
                      <div v-if="card.secretKey != ''">
                        <span class="small">SecretKey:</span>
                        <span>{{ card.secretKey }}</span>
                      </div>
                      <v-btn color="primary" @click.stop="dialogSecretKey = true">Secret Key</v-btn>
                    </v-layout>
                  </v-flex>

                  <v-flex d-flex xs12 sm6 md4>
                    <pie-chart :data="feeChartData" :colors="['#29B6F6', '#AB47BC']"></pie-chart>
                  </v-flex>
                </v-layout>

                <!-- Dialog Model ApiKey -->
                <v-dialog v-model="dialogApiKey" max-width="500px">
                  <v-card>
                    <v-card-title>Api Key Dialog</v-card-title>
                    <v-card-text>
                      <v-text-field
                        label="Input your api key"
                        @keydown="onKeyDown($event, 'apiKey', index)"
                        v-model="card.apiKey"
                      ></v-text-field>
                    </v-card-text>
                    <!-- <v-card-actions>
                      <v-btn color="secondary" @click.native="dialogApiKey = false">Close</v-btn>
                      <v-btn color="success" @click.native="dialogApiKey = false">OK</v-btn>
                    </v-card-actions>-->
                  </v-card>
                </v-dialog>

                <!-- Dialog Model SecretKey -->
                <v-dialog v-model="dialogSecretKey" max-width="500px">
                  <v-card>
                    <v-card-title>Secret Key Dialog</v-card-title>
                    <v-card-text>
                      <v-text-field
                        label="Input your secret key"
                        @keydown="onKeyDown($event, 'secretKey', index)"
                        v-model="card.secretKey"
                      ></v-text-field>
                    </v-card-text>
                    <!-- <v-card-actions>
                      <v-btn color="secondary" @click.native="dialogSecretKey = false">Close</v-btn>
                      <v-btn color="success" @click.native="dialogSecretKey = false">OK</v-btn>
                    </v-card-actions>-->
                  </v-card>
                </v-dialog>
              </v-card-text>
            </v-card>
          </draggable>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import draggable from "vuedraggable";

export default {
  components: {},
  data() {
    return {
      cards: [],
      arbitrationCenters: [
        { text: "BINANCE" },
        { text: "BTCTURK" },
        { text: "KOINEKS" }
      ],
      coinArray: {
        BINANCE: [
          "BTC/USDT",
          "ETH/USDT",
          "LTC/USDT",
          "XRP/USDT",
          "ETH/BTC",
          "LTC/BTC",
          "XRP/BTC",
          "BTG/USDT",
          "ETC/USDT",
          "BCC/USDT",
          "BTG/BTC",
          "ETC/BTC",
          "XEM/BTC",
          "BCC/BTC",
          "DASH/BTC"
        ],
        BTCTURK: [
          "BTC/TRY",
          "BTC/USDT",
          "ETH/TRY",
          "LTC/TRY",
          "XRP/TRY",
          "USDT/TRY"
        ],
        KOINEKS: [
          "BTC/TRY",
          "BTC/USDT",
          "ETH/TRY",
          "LTC/TRY",
          "XRP/TRY",
          "USDT/TRY",
          "DASH/TRY",
          "XLM/TRY",
          "BTG/TRY",
          "ETC/TRY",
          "XEM/TRY",
          "DOGE/TRY",
          "BCH/TRY"
        ]
      },
      headers: [
        { text: "Price", sortable: false, value: "name" },
        { text: "Amount", sortable: false, value: "amount" },
        { text: "Total", sortable: false, value: "total" }
      ],
      items: [],
      balanceChartData: {},
      feeChartData: {},
      dialogApiKey: false,
      dialogSecretKey: false
    };
  },
  created() {
    this.addCard();
  },
  mounted() {
    this.balanceChartData = {
      BTC: 10,
      USDT: 20
    };
    this.feeChartData = {
      TAKER: 1,
      MAKER: 3
    };
  },
  methods: {
    addCard() {
      const idx = this.cards.length % 3;
      this.cards.push({
        center: this.arbitrationCenters[idx].text,
        exchangeCoins: this.coinArray[this.arbitrationCenters[idx].text],
        exchangeCoin: this.coinArray[this.arbitrationCenters[idx].text][0],
        balanceWarning: 0,
        ratioWarning: 0,
        apiKey: "",
        secretKey: ""
      });
    },
    removeCard(index) {
      if (this.cards.length == 1) {
        this.$toast.warn({
          title: "Info",
          message: "Can't remove it"
        });
        return;
      }
      this.cards.splice(index, 1);
    },
    onChangeCenter(index) {
      this.cards[index].exchangeCoins = this.coinArray[
        this.cards[index].center
      ];
      this.cards[index].exchangeCoin = this.cards[index].exchangeCoins[0];
    },
    onChangeExchangeCoin() {},
    onKeyDown(e, type, index) {
      if (e.keyCode == 13) {
        console.log(index);
        if (type == "apiKey") {
          this.dialogApiKey = false;
        } else if (type == "secretKey") {
          this.dialogSecretKey = false;
        }
      }
    }
  },
  components: {
    draggable
  }
};
</script>