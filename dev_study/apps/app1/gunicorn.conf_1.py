# Copyright (C) 2025 Shubham Agarwal
#
# This program is free software: you can redistribute it and/or modify
# it under the terms of the GNU Affero General Public License as published
# by the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.
#
# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU Affero General Public License for more details.
#
# You should have received a copy of the GNU Affero General Public License
# along with this program.  If not, see <https://www.gnu.org/licenses/>.
 
bind = '0.0.0.0:9000'
workers = 1
worker_class = 'gthread'
preload = True
reload = True
daemon = False
threads = 4
timeout = 120
keepalive = 5
pidfile = './logs/gunicorn_server_1.pid'
errorlog  = f'./logs/app1_gc.log'
loglevel = 'info'
capture_output = True
proc_name = 'gunicorn_server_1'
max_requests = 0
wsgi_app = "app1.wsgi"