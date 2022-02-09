(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{254:function(t,n,e){"use strict";e.r(n);e(34);var r=e(0),o=r.a.extend({data:function(){return{repos:[]}},head:function(){return{title:"开源"}},mounted:function(){var t=this;this.$axios.post("https://api.github.com/graphql",{query:"\n        query {\n          viewer {\n            repositories(first: 100, isFork: false, privacy: PUBLIC) {\n              edges {\n                node {\n                  id,\n                  name,\n                  nameWithOwner,\n                  url,\n                  description,\n                  stargazerCount,\n                  forkCount,\n                  primaryLanguage {\n                    id,\n                    name,\n                    color\n                  }\n                }\n              }\n            }\n          }\n        }\n      "},{headers:{Authorization:"bearer ".concat("")}}).then((function(n){var data=n.data;t.repos=data.data.viewer.repositories.edges.map((function(i){return i.node})),console.log(t.repos)}))},methods:{getLanguageTagStyle:function(t){return{borderColor:t,color:t}}}}),l=e(15),component=Object(l.a)(o,(function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"container max-w-6xl mx-auto"},[e("div",{staticClass:"grid grid-cols-3 gap-6 my-10"},t._l(t.repos,(function(n){return e("div",{key:n.id,staticClass:"flex flex-col bg-white shadow-md rounded-md p-4 repo-list-item"},[e("a",{staticClass:"text-xl font-semibold text-gray-600 no-underline",attrs:{href:n.url,target:"_blank"},domProps:{textContent:t._s(n.name)}}),t._v(" "),e("div",{staticClass:"text-gray-600 my-4"},[t._v("\n        "+t._s(n.description)+"\n      ")]),t._v(" "),e("div",{staticClass:"flex flex-row mt-auto"},[n.primaryLanguage?e("span",{staticClass:"mr-3 px-2 font-bold border rounded-sm",style:t.getLanguageTagStyle(n.primaryLanguage.color)},[t._v(t._s(n.primaryLanguage.name))]):t._e(),t._v(" "),e("div",{staticClass:"mr-3 text-gray-700 stars"},[e("span",{staticClass:"mdi mdi-star"}),t._v(" "+t._s(n.stargazerCount)+"\n        ")]),t._v(" "),e("div",{staticClass:"mr-3 text-gray-700 stforksars"},[e("span",{staticClass:"mdi mdi-directions-fork"}),t._v(" "+t._s(n.forkCount)+"\n        ")])])])})),0)])}),[],!1,null,null,null);n.default=component.exports}}]);