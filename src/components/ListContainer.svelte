<style lang="scss">
.list-container {
  width: 100vw;
  height: calc(100vh - 40px);
  padding: 30px;
  box-sizing: border-box;
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;
  font-size: 0;
  border: 10px solid red;
  .lists {
    display: inline-block;
    height: 100%;
    border: 10px solid blue;
    white-space: nowrap;
    font-size: 0;
  }
}
</style>

<script>
import List from "~/components/List.svelte";
import CreateList from "~/components/CreateList.svelte";
</script>

<div class="list-container">
  <div class="lists">
    <List />
    <List />
  </div>
  <CreateList />
</div>
