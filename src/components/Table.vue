<template>
  <div class="container">
    <table class="striped responsive-table table" v-if="users.length">
      <thead>
        <tr>
          <th>Ф.И.О</th>
          <th>Электронный адрес</th>
          <th>Пароль</th>
          <th>Телефон</th>
          <th>Статус</th>
          <th>Дата создания</th>
          <th>
            Дата последнего <br />
            изменения
          </th>
          <th>Редактировать</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td>{{ user.fullname }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.pass }}</td>
          <td>{{ user.tel }}</td>
          <td>{{ user.status }}</td>
          <td>{{ user.dateCreate }}</td>
          <td>{{ user.dateEdit }}</td>
          <td>
            <button
              class="btn btn-info"
              @click="$router.push('/edit/' + user.id)"
            >
              Редактировать
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-else class="info">
      {{ emptyTitle }}
      <router-link to="/create" tag="a">Хотите добавить</router-link>
    </div>
  </div>
</template>

<script>
export default {
  props: ["users", "emptyTitle"],
};
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
}

.info {
  font-size: 20px;
  font-weight: bold;
  text-align: center;
}

.table {
  box-shadow: 0 2px 5px 2px rgba(0, 0, 0, 0.185);
  @media (max-width: 992px) {
    overflow: hidden;
  }

  tr > td:first-child,
  th:first-child {
    padding-left: 2rem;

    @media (max-width: 992px) {
      padding-left: 5px;
    }
  }
}
</style>
