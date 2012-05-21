
define(["jquery","knockout","sammy","moment","template","localstorage"], function($, ko, Sammy, moment) {
	
	ko.extenders.relativeDate = function(target, precision) {
		
		var result = ko.computed({
			read: target,
			write: function(newValue) {
				target("newval");
			}
		});
		
		result(target());
		
		return result;
	}
	
	return function appViewModel() {
		
		var self = this;
			
		this.date = "dddd, MMMM Do YYYY, h:mm:ss a";
			
		this.newID = function() {
			var chr = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz",
				str = "";
			for( var i=0; i < 8; i++ ) {
				var pos = Math.floor(Math.random() * chr.length);
				str += chr.substring(pos, pos+1);
			}

			return str;
		}
		
		this.activePage = ko.observable("create");
		this.postID = ko.observable("");
		this.whichPage = function() {
			return self.activePage();
		}
		
		this.viewPost = function(post) {
			location.hash = '!/' + post.id;
		}
		
		this.blogEntries = ko.observableArray([], {persist: "koBlogs"});
		
		this.blogTitle = ko.observable();
		this.blogEntry = ko.observable();
		this.singleEntry = ko.computed(function() {
			return ko.utils.arrayFilter(this.blogEntries(), function(entry) {
				
				for( x in entry ) {
					console.log(entry[x]);
				}
				return entry.id == self.postID();
			});
		}, this);
		
		this.save = function() {;
			if( self.blogTitle() && self.blogEntry() ) {
				self.blogEntries.unshift({id: self.newID(), title: self.blogTitle(), entry: self.blogEntry(), create: Math.round(new Date().getTime())});
				self.blogTitle("");
				self.blogEntry("");
			}
		}
		
		this.removeEntry = function(post) {
			self.blogEntries.remove(post);
		}
		
		// animations
		this.showNewEntry = function(el) {
			$(el).hide().fadeIn();
		}
		
		Sammy(function() {
		
			this.get("#!/", function() {
				self.activePage("create");
			});
			
			this.get("#!/:id", function() {
				self.activePage("single");
				self.postID(this.params.id);
			});
			
		}).run('#!/');
	}
	
});