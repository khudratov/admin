<template>
  <div>
    <Navbar />
    <!-- Search -->
    <div class="container">
      <div class="input-field col s12">
        <i class="material-icons prefix">search</i>
        <input
          id="icon_prefix2"
          type="text"
          v-model="search"
          ref="autocomplite"
          class="autocomplete"
          @input="handleSearch"
        />
        <label for="icon_prefix2">Поиск</label>
      </div>
    </div>

    <!-- Filters -->
    <div class="container" v-if="!search.length">
      <div class="filters">
        <div class="filters--title">
          Фильтры
        </div>
        <div class="filters--checkbox">
          <p>
            <label>
              <input
                type="checkbox"
                checked="checked"
                value="Client"
                v-model="filter"
              />
              <span>Client</span>
            </label>
          </p>
          <p>
            <label>
              <input
                type="checkbox"
                checked="checked"
                value="Partner"
                v-model="filter"
              />
              <span>Partner</span>
            </label>
          </p>
          <p>
            <label>
              <input
                type="checkbox"
                checked="checked"
                value="Admin"
                v-model="filter"
              />
              <span>Admin</span>
            </label>
          </p>
        </div>
      </div>
    </div>

    <div class="info-text center blue  lighten-2" v-if="search.length">
      Количество найденных пользователей: {{ found.length }}
    </div>

    <!-- Filtered  Users-->
    <Table
      v-if="!search.length"
      :users="filteredUsers"
      emptyTitle="Нет пользователей."
    />

    <!-- Found users -->
    <Table
      v-if="search.length"
      :users="found"
      emptyTitle="Пользователь не найден."
    />

    <router-link
      to="/create"
      tag="a"
      class="btn-floating btn-large waves-effect waves-light red button_add"
    >
      <i class="material-icons">add</i>
    </router-link>
  </div>
</template>

<script>
import Table from "@/components/Table";
import Navbar from "@/components/Navbar";

export default {
  components: {
    Table,
    Navbar,
  },
  data: () => ({
    found: [],
    search: "",
    users: [],
    filter: ["Client", "Partner", "Admin"],
  }),

  mounted() {
    this.users = JSON.parse(localStorage.getItem("users"));
    this.message();
  },

  methods: {
    handleSearch() {
      this.found = this.users.filter((user) => {
        if (
          user.tel.includes(this.search) ||
          user.email.includes(this.search)
        ) {
          return user;
        }
      });
    },

    message() {
      switch (this.$route.query.message) {
        case "created":
          this.$message("Пользователь создан");
          break;
        case "deleted":
          this.$message("Пользователь удален");
          break;
        case "updated":
          this.$message("Пользователь отредактирован");
          break;
        case "notUpdated":
          this.$message("Пользователь не редактировался");
          break;
      }
    },
  },

  computed: {
    filteredUsers() {
      const users = this.users.filter((user) => {
        if (this.filter.join().includes(user.status)) {
          return user;
        }
      });

      return users;
    },
  },
};
</script>

<style lang="scss" scoped>
.button_add {
  position: fixed;
  bottom: 20px;
  right: 20px;
}
.info-text {
  margin: 0 auto;
  padding: 5px 10px;
  display: block;
  max-width: 250px;
  color: white;
  border-radius: 10px 10px 0 0;
}
.filters {
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  align-items: center;

  &--title {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &--checkbox {
    display: flex;
    width: 300px;
    justify-content: space-around;
    align-items: center;
  }
}
</style>
