pmoney = new Mongo.Collection("pmoney");

//pmoney.insert({child:"Ed",type:"paid",whatfor:"Pocket Money",date: new Date(),amount: 3.00});

if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('counter', 0);

/*
  Template.hello.helpers({
    counter: function () {
      return Session.get('counter');
    }
  });
*/
  Template.heading.events({
    'click .btn': function (event, template) {
//      Session.set('counter', Session.get('counter') + 1);
	var child=event.currentTarget.id;
	console.log("You clicked on "+child);
	Session.set('child', child);
    }
  });
  Template.heading.helpers({
    child: function () {
      return Session.get('child');
    }
  });

Template.transactions.helpers({
	transactionlist: function() {
	return pmoney.find(
		{
			child: Session.get('child'),
			type: { $in: ["paid","spent","owed"]}
		}
	);
	},
	prettyDate: function(timestamp){
		//console.log("you sent me "+timestamp);
		var ts=new Date(timestamp);
		var curr_date = ts.getDate();
	    var curr_month = ts.getMonth() + 1; //Months are zero based
    	var curr_year = ts.getFullYear();
    	return (curr_date + "-" + curr_month + "-" + curr_year);
		//console.log(ts.getDate());
		//return (new Date(timestamp)).format("yyyy-MM-dd");
	},
	prettyCurrency: function(amount){
		//console.log("you sent me "+timestamp);
		return "£ "+amount.toFixed(2);
		//console.log(ts.getDate());
		//return (new Date(timestamp)).format("yyyy-MM-dd");
	},
	isOwed: function(type){
	// check if this transaction is a generated 'owe' one to render pay option 
		return (type === "owed");
	}

});

/*
Template.categories.events({
	'click #btnNewCat': function(e,t){
	Session.set('adding_category',true);
	Tracker.flush();
	focusText(t.find("#add-category"));
	},
	'keyup #add-category': function(e,t){
		if (e.which === 13){
			var catVal = String(e.target.value || "");
			if(catVal){
				lists.insert({Category: catVal});
				Session.set('adding_category',false);

			}
		}
	},
	'focusout #add-category': function(){
		Session.set('adding_category',false);
	}
});
*/

}


if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
