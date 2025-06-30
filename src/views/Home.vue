<template>
  <div class="container">
    <nav class="mt-2">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">Home</li>
      </ol>
    </nav>
    <h1 class="mt-3 text-center">Home</h1>
    <div class="mt-4">
      SpaceOverview.com is an open source project that makes it easy for students and researchers to
      find mathematical knowledge.
    </div>
    <div class="mt-2">We currently list</div>
    <ul>
      <li>
        Banach spaces (<a href="https://en.wikipedia.org/wiki/Banach_space" target="_blank"
          >wikipedia info</a
        >)
      </li>
      <li>
        Differential equations (<a
          href="https://en.wikipedia.org/wiki/Differential_equation"
          target="_blank"
          >wikipedia info</a
        >)
      </li>
    </ul>
    <div>You can</div>
    <ul>
      <li>
        See a list of
        <router-link to="/space">Banach spaces</router-link>
      </li>
      <li>
        See a list of
        <router-link to="/property">properties</router-link> of Banach spaces
      </li>
      <li>
        See a list of
        <router-link to="/theorem">theorems</router-link> of Banach spaces
      </li>
      <li class="mt-3">
        See a list of
        <router-link to="/differential-equation">differential equations</router-link>
      </li>
      <li>
        See a list of
        <router-link to="/differential-equation/property">properties</router-link> of differential
        equations
      </li>
      <li class="mt-3">
        Browse the source code on GitHub (<a
          href="https://github.com/Wilmersdorf/spaceoverview"
          target="_blank"
          >Server</a
        >, <a href="https://github.com/Wilmersdorf/spaceoverview-ui" target="_blank">Front end</a>)
      </li>
      <li>
        Find a list of future product ideas on
        <a
          href="https://www.notion.so/Product-Plan-ad0dae2671974850a42cd0db3145e212"
          target="_blank"
          >Notion</a
        >
      </li>
    </ul>
    <div>
      This website is currrently in alpha status. Please write an email to info@spaceoverview.com to
      contribute to this project, for example by
      <ul>
        <li>Adding Banach spaces, differential equations, properties or theorems</li>
        <li>Giving feedback</li>
        <li>Testing future versions</li>
      </ul>
    </div>
  </div>
</template>
