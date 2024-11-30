<script setup>
import MainLayout from "@/layouts/MainLayout.vue";
import BaseSection from "@/app/components/shared/BaseSection.vue";
</script>

<template>
	<MainLayout :title="'О системе'">
		<BaseSection>
			<p>Эта система разработана для создания документов и отчетов по внеклассной, воспитательной деятельности в ЧЭнК.</p>
			<h3>Функционал системы включает в себя:</h3>
			<ul>
				<li>Создание мероприятия</li>
				<li>Просмотр существующих мероприятий</li>
				<li>Добавление участников мероприятий</li>
				<li>Просмотр списка групп учащихся</li>
				<li>Просмотр списка студентов определенных групп</li>
				<li>Добавление студентов в базу из Excel файла</li>
			</ul>
			<h3>Разработчик:</h3>
			<p>Студент группы ИСП-8-21 Лосев Артем</p>
		</BaseSection>
	</MainLayout>
</template>
